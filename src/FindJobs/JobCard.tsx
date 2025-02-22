import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour3,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { idText } from "typescript";
import { successNotification } from "../Services/NotificationService";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import { getItem } from "../Services/LocalStorageService";
import { getProfile } from "../Services/ProfileService";

const JobCard = (props: any) => {
  // const profile = useSelector((state: any) => state.profile);
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
      successNotification("Error", "Please log in to save jobs");
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

  // Function to update the user in local storage
  const updateUserInLocalStorage = (updatedProfile: any) => {
    // Get the existing user from local storage
    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");

    // Merge the existing user with new data (you can update specific fields here)
    const updatedUser = { ...existingUser, ...updatedProfile };

    // Save the updated user back to local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log("User updated in local storage:", updatedUser);
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
        {
          //Array.isArray(profile.savedJobs) &&
          //profile.savedJobs?.includes(props.id)
          isBookmarked ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              className="cursor-pointer text-bright-sun-400"
              stroke={1.5}
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className="text-mine-shaft-200 cursor-pointer hover:text-bright-sun-400"
              stroke={1.5}
            />
          )
        }
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
          {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};
export default JobCard;
