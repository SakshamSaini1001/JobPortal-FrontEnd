import { ActionIcon, Button, Divider } from "@mantine/core";
import {
  IconAdjustments,
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../Services/ProfileService";
import { postJob } from "../Services/JobService";
const JobDesc = (props: any) => {
  const dispatch = useDispatch();
  // const profile = useSelector((state: any) => state.profile);
  const [JobDesc, setJobDesc] = useState(false);
  const [applied, setApplied] = useState(false);

  const data = DOMPurify.sanitize(props.description);

  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId == user.id
      ).length > 0
    ) {
      setApplied(true);
    } else setApplied(false);
  }, [props]);

  useEffect(() => {
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [user?.id, dispatch]);

  useEffect(() => {
    const bookmarked = profile.savedJobs?.includes(props.id) || false;
    setIsBookmarked(bookmarked);
  }, [profile.savedJobs, props.id]);

  const handleTalentCards = () => {
    setJobDesc(!JobDesc);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        successNotification("Success", "Job Closed Successfully");
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Error",
          err.errorMessage || err.response.errorMessage
        );
      });
  };
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
  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img
              className=" h-14"
              src={`/Icons/${props.company}.png`}
              alt=" "
            />
          </div>
          <div>
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {(props.edit || !applied) && (
            <Link
              to={
                props.edit
                  ? `/upload-jobs/${props.id}`
                  : `/apply-jobs/${props.id}`
              }
            >
              <Button color="brightSun.4" variant="light">
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {!props.edit && applied && (
            <Button color="green.8" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              color="red.5"
              size="sm"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          ) : isBookmarked ? (
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
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between">
        {card.map((items: any, index: any) => (
          <div key={index} className=" flex flex-col items-center">
            <ActionIcon
              color="brightSun.4"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <items.icon className="w-4/5 h-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300 ">{items.name}</div>
            <div className="font-semibold">
              {props ? props[items.id] : "NA"}{" "}
              {items.id == "packageOffered" && <>LPA</>}
            </div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-3">
          {props?.skillsRequired?.map((skill: any, index: number) => (
            <ActionIcon
              key={index}
              color="brightSun.4"
              className="!h-fit font-medium !w-fit !text-sm"
              variant="light"
              p="xs"
              radius="xl"
              aria-label="Settings"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
        <Divider my="xl" />
        <div
          className="[&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_*]:text-mine-shaft-300 "
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
        <Divider my="xl" />
        <div>
          <div className="text-xl font-semibold mb-5">About Company</div>
          <div className="flex justify-between mb-3">
            <div className="flex gap-3 items-center">
              <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img
                  className=" h-7"
                  src={`/Icons/${props.company}.png`}
                  alt=" "
                />
              </div>
              <div className="flex flex-col ">
                <div className="font-semibold text-lg">{props.company}</div>
                <div className="text-mine-shaft-300">10K+ Employees</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Link to={`/Company/${props.company}`}>
                <Button
                  onClick={handleTalentCards}
                  color="brightSun.4"
                  variant="light"
                >
                  Company Page
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-mine-shaft-300">{props.about}</div>
        </div>
      </div>
    </div>
  );
};
export default JobDesc;
