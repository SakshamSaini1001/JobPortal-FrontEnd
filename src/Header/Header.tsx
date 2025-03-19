import {
  Avatar,
  Burger,
  Button,
  Drawer,
  Indicator,
  NavLink,
} from "@mantine/core";
import {
  IconBell,
  IconBrightnessDownFilled,
  IconEyeSearch,
  IconGlobe,
  IconSettings,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const navigate = useNavigate();
  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  const jwt = localStorage.getItem("token");
  const links = [
    { name: "Home", url: "find-home" },
    { name: "Find Job", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    ...(user?.accountType === "APPLICANT"
      ? [{ name: "Mock Interview", url: "mockInterview" }]
      : [{ name: "Upload Job", url: "upload-jobs/0" }]),
    ...(user?.accountType === "APPLICANT"
      ? [{ name: "Resume Analyze", url: "resumeanalyze" }]
      : [{ name: "Posted Job", url: "posted-jobs/0" }]),
    { name: "Job History", url: "job-history" },
    ...(jwt ? [] : [{ name: "SignUp", url: "signup" }]),
  ];

  useEffect(() => {
    // if (!token) {
    //   navigate("/login"); // Redirect if no token
    //   return;
    // }
    if (token) {
      try {
        const decoded = jwtDecode(localStorage.getItem("token") || "");
        dispatch(setUser({ ...decoded, email: decoded.sub }));
        getProfile(user?.profileId)
          .then((res) => {
            dispatch(setProfile(res));
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate]);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");

  //   if (storedToken) {
  //     try {
  //       const decoded: any = jwtDecode(storedToken);
  //       dispatch(setUser({ ...decoded, email: decoded.sub }));
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }
  //   }

  //   if (user?.profileId) {
  //     getProfile(user.profileId)
  //       .then((res) => {
  //         dispatch(setProfile(res));
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [token, navigate, dispatch, user?.profileId]);

  const location = useLocation();
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full px-6 text-white bg-mine-sha h-20 flex justify-between items-center  bg-mine-shaft-950 ">
      {/* Logo and Ti */}
      <div className="flex gap-5 items-center text-bright-sun-400">
        <IconGlobe className="h-14 w-14" stroke={2} />
        <div className="xs-mx:hidden text-3xl font-semibold font-sans">
          Jobster
        </div>
      </div>

      {/* NavLinks */}
      <NavLinks />

      {/* Profile */}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}

        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.25} />
        </div> */}

        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.25} />
          </Indicator>
        </div> */}

        {user ? <NotiMenu /> : <></>}
        {}
        <Burger
          className="bs:hidden"
          opened={opened}
          onClick={open}
          aria-label="Open navigation"
        ></Burger>
        <Drawer
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          opened={opened}
          onClose={close}
          title="Settings"
          closeButtonProps={{ icon: <IconX size={30} stroke={1.5} /> }}
        >
          <div className="flex flex-col gap-6 items-center">
            {links.map((link, index) => (
              <div key={link.url} className="h-full flex items-center">
                <Link
                  className="hover:text-brigtht-sun-400 text-xl"
                  key={index}
                  to={link.url}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <> </>
  );
};
export default Header;
