import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCards";
import CertiCards from "./CertifiCards";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
const Profile = (props: any) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id)
      .then((res) => {
        setProfile(res);
        console.log("hi", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="w-2/3 px-5">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" />
        <Avatar
          className="!w-48 !h-48 rounded-full absolute -bottom-1/3 left-3 border-mine-shaft-950 border-8"
          src={
            profile.picture
              ? `data:image/jpeg;base64,${profile.picture}`
              : "/avatar.png"
          }
        />
      </div>
      <div className="px-3 mt-16">
        <div className="flex text-3xl font font-semibold justify-between">
          {profile.name}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex gap-2 items-center">
          <IconBriefcase w-5 h-5 stroke={1.5} />
          {profile?.jobTitle}
        </div>
        <div className=" flex gap-1 items-center text-lg text-mine-shaft-400">
          <IconMapPin className="w-5 h-5" stroke={1.5} />
          {profile?.location}
        </div>
        <div className=" flex gap-1 items-center text-lg text-mine-shaft-400">
          <IconBriefcase className="w-5 h-5" stroke={1.5} />
          Experience:
          {profile?.totalExp} Years
        </div>
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-3xl font-semibold mb-3 ">About</div>
        <div className="text-l text-mine-shaft-300 text-justify">
          {profile.about}
        </div>
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-3xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-4 w-96">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="text-sm font-medium text-bright-sun-400 bg-bright-sun-300 bg-opacity-15 px-3 py-1 rounded-3xl"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div className="px-4 ">
        <div className="text-3xl font-semibold mb-5">Experiences</div>
        <div className="flex flex-col gap-10">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div className="px-4">
        <div className="text-3xl font-semibold mb-5">Certification</div>
        <div className="flex flex-col gap-10">
          {profile?.certifications?.map((certi: any, index: any) => (
            <CertiCards key={index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;
