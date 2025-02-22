import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { profile } from "../Data/TalentData";

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 overflow-hidden ">
      <Divider mx="md" mb="xl" />
      <Profile {...Profile} />
    </div>
  );
};
export default ProfilePage;
