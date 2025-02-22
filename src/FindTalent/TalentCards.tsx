import {
  IconBookmark,
  IconCalendarMonth,
  IconClockHour3,
  IconHeart,
  IconMapPin,
} from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import {
  formatInterviewTime,
  showResumeFromBase64,
} from "../Services/Utilities";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { DateInput, TimeInput } from "@mantine/dates";

const TalentCards = (props: any) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [TalentCards, setTalentCards] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else setProfile(props);
    console.log(props);
  }, [props]);

  const handleTalentCards = () => {
    setTalentCards(!TalentCards);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING") {
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully"
          );
        } else if (status == "OFFERED") {
          successNotification("Offered", "Offer has been sent Successfully");
        } else {
          successNotification("Rejected", "Application has been Rejected");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.errorMessage);
      });
  };
  return (
    <div className="bg-mine-shaft-900 p-3 w-96  rounded-xl flex flex-col gap-4 border border-bright-sun-400 hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-3 transition duration-300  ease-in-out !shadow-bright-sun-300 ">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <Avatar
              className=" h-10 rounded-full"
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : `/Avatar.png`
              }
            />
          </div>
          <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-xs text-mine-shaft-300">
              {profile?.jobTitle} &#x2022;{profile?.company} Applicants
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-200 cursor-pointer" />
      </div>
      <div className="flex gap-2">
        {profile?.skills?.map(
          (skill: any, index: any) =>
            index < 4 && (
              <div
                key={index}
                className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"
              >
                {skill}
              </div>
            )
        )}
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
      >
        {profile?.about}
      </Text>
      <Divider size="xs" color="mineShaft.5" />
      {props.invited ? (
        <div className="text-mine-shaft-200 text-sm items-center flex  gap-2">
          <IconCalendarMonth className="w-5 h-5" />
          Interview: {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className=" text-mine-shaft-300">
            Exp : {props.totalExp ? props.totalExp : 0} Years
          </div>
          <div className="flex gap-1 items-center text-xs text-mine-shaft-400 ">
            <IconMapPin className="w-5 h-5" stroke={1.5} />
            {profile?.location}
          </div>
        </div>
      )}
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button
                onClick={handleTalentCards}
                color="brightSun.4"
                fullWidth
                variant="outline"
              >
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                  color="brightSun.4"
                  fullWidth
                  variant="light"
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" fullWidth variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              {" "}
              <Button
                onClick={() => handleOffer("OFFERED")}
                color="brightSun.4"
                fullWidth
                variant="outline"
              >
                Accepted
              </Button>
            </div>
            <div>
              {" "}
              <Button
                onClick={() => handleOffer("REJECTED")}
                color="brightSun.4"
                fullWidth
                variant=""
              >
                Rejected
              </Button>
            </div>
          </>
        )}
        {(props.invited || props.posted) && (
          <Button
            onClick={openApp}
            color="brightSun.4"
            fullWidth
            variant="filled"
          >
            View Application
          </Button>
        )}

        <Modal opened={app} onClose={closeApp} title="Application">
          <div className="flex flex-col gap-4 ">
            Email: &emsp;
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div className="flex flex-col gap-4 ">
            Website: &emsp;
            <a
              target="_blank"
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={props.website}
            >
              {props.website}
            </a>
          </div>
          <div className="flex flex-col gap-4 ">
            Resume: &emsp;
            <span
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              onClick={() => showResumeFromBase64(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div className="flex flex-col gap-4 ">
            Cover Letter: &emsp;<div>{props.coverLetter}</div>
          </div>
        </Modal>

        <Modal
          opened={opened}
          onClose={close}
          title="Schedule Interview"
          centered
        >
          <div className="flex flex-col gap-4">
            <DateInput
              value={date}
              onChange={setDate}
              minDate={new Date()}
              placeholder="Enter Date"
              label="Date"
            />
            <TimeInput
              value={time}
              onChange={(event) => setTime(event.currentTarget.value)}
              ref={ref}
              minTime=""
              label="Time"
              onClick={() => {
                ref.current?.showPicker();
              }}
            />
          </div>
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </Modal>
      </div>
    </div>
  );
};
export default TalentCards;
