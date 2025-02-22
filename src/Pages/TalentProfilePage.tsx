import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../TalentProfile/RecommendedTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any[]>([]);
  useEffect(() => {
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
      <Divider size="xs" />
      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        my="sm"
        color="brightSun.4"
        variant="light"
      >
        Profile
      </Button>
      <Divider size="xs" />
      <div className="flex mt-4">
        <Profile {...profile} />
        <RecommendedTalent talents={talents} />
      </div>
    </div>
  );
};
export default TalentProfilePage;
