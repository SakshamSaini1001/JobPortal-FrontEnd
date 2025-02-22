import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import { errorNotification } from "../Services/NotificationService";

const Card = (props: any) => {
  const dispatch = useDispatch();
  const [JobCard, setJobCard] = useState(false);
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [user.id, dispatch]);

  useEffect(() => {
    const bookmarked = profile.savedJobs?.includes(props.id) || false;
    setIsBookmarked(bookmarked);
  }, [profile.savedJobs, props.id]);

  const handleSaveJob = () => {
    if (!user?.id) {
      errorNotification("Error", "Please log in to save jobs");
      return;
    }
    const savedJobs = Array.isArray(profile.savedJobs)
      ? [...profile.savedJobs]
      : [];
    const updatedSavedJobs = isBookmarked
      ? savedJobs.filter((id) => id !== props.id)
      : [...savedJobs, props.id];
    dispatch(
      changeProfile({
        ...profile,
        savedJobs: updatedSavedJobs,
      })
    );

    setIsBookmarked(!isBookmarked);
  };
  const handleJobCard = () => {
    setJobCard(!JobCard);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-mine-shaft-900 p-5 w-80 justify-between rounded-xl flex flex-col gap-4 border border-bright-sun-400 hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-3 transition duration-300  ease-in-out !shadow-bright-sun-300 ">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className=" h-10"
              src={`/Icons/${props.company}.png`}
              alt=" "
            />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022;
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        {props.saved ? (
          <IconBookmarkFilled className="text-bright-sun-400 color-full-b cursor-pointer" />
        ) : (
          <IconBookmark className="text-mine-shaft-200 cursor-pointer" />
        )}
      </div>
      <div className=" flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs cursor-pointer">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
      >
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.5" />
      <div className="flex justify-between">
        <div>
          &#8377;{props.packageOffered}
          <span>LPA</span>
        </div>
        <div className="flex gap-1 items-center text-xs text-mine-shaft-400 ">
          <IconClockHour3 className="w-5 h-5" stroke={1.5} />
          {props.applied ? "Applied " : props.offered ? "offered " : "Posted"}
          {timeAgo(props.postTime)}
        </div>
      </div>
      {props.offererd && <Divider size="xs" color="mineShaft.5" />}
      {props.offered && (
        <div className="flex gap-2">
          <Button color="brightSun.4" fullWidth variant="outline">
            Accepted
          </Button>
          <Button color="brightSun.4" fullWidth variant="light">
            Rejected
          </Button>
        </div>
      )}
      {props.interviewing && (
        <div className="text-mine-shaft-200 text-sm items-center flex  gap-2">
          <IconCalendarMonth className="text-bright-sun-400 w-5 h-5" />
          Sunday, 25, August 2024{" "}
          <span className="text-mine-shaft-400">10:00 AM</span>
        </div>
      )}
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};
export default Card;
