import { IconArrowLeft, IconGlobe } from "@tabler/icons-react";
import SingUp from "../SingUpLogin/SingUp";
import Login from "../SingUpLogin/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useState } from "react";

const SingUpPage = () => {
  const navigate = useNavigate();
  const [Home, setHome] = useState(false);
  const handleJobCard = () => {
    setHome(!Home);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const location = useLocation();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 relative  overflow-hidden ">
      <Button
        my="4"
        className="!absolute"
        leftSection={<IconArrowLeft size={20} />}
        onClick={() => navigate("/")}
        color="brightSun.4"
        variant="light"
      >
        Home
      </Button>
      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0   ${
          location.pathname == "/signup" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full translate-all ease-in-out duration-1000 ${
            location.pathname == "/signup"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          } bg-mine-shaft-900 flex flex-col items-center  justify-center gap-5`}
        >
          <div className="flex gap-5 items-center text-bright-sun-400">
            <IconGlobe className="h-16 w-16" stroke={2} />
            <div className="text-6xl font-bold font-sans">Jobster</div>
          </div>
          <div className="text-2xl text-mine-shaft-200 font-semibold ">
            Find Job made For You
          </div>
        </div>
        <SingUp />
      </div>
      <div className="absolute top-0 ">
        <Link to="/home">
          <Button onClick={handleJobCard} className="mt-1 ml-2 ">
            <IconArrowLeft />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SingUpPage;
