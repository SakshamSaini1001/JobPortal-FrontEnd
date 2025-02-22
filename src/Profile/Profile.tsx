import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import ExpCard from "./ExpCards";
import CertiCards from "./CertifiCards";
import { skills } from "../Data/JobDescData";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { getProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { resolve } from "path";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";
// import { fields } from "../Data/PostJob";
const Profile = () => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([
    "React",
    "Spring Boot",
    "Java",
    "Python",
    "Node.js",
    "MongoDB",
    "Express",
    "Django",
    "PostgreSQL",
  ]);
  const select = fields;
  const [addExp, setAddExp] = useState(false);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
    console.log(edit);
  };
  const user = useSelector((state: any) => state.user);
  //const [profile, setProfile] = useState({});
  const profile = useSelector((state: any) => state.profile);

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
  const { hovered, ref } = useHover();

  const handleChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture Updated Successfully");
  };

  return (
    <div className="w-3/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 left-3"
        >
          <Avatar
            className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            alt=""
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
          {hovered && (
            <FileInput
              onChange={handleChange}
              className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full "
              variant="transparent"
              accept="image/png,image/jpeg"
            />
          )}
        </div>
      </div>
      <div className="px-3 mt-20">
        <Info />
      </div>
      <Divider my="xl" />
      <About />
      <Divider my="xl" />
      <Skills />
      <Divider my="xl" />
      <Experience />
      <Divider my="xl" />
      <Certificate />
    </div>
  );
};
export default Profile;
