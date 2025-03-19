import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const user = useSelector((state: any) => state.user);
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

  const location = useLocation();
  return (
    <div className="flex bs-mx:!hidden gap-5 h-full items-center text-mine-shaft-300">
      {links.map((link, index) => (
        <div
          key={link.url}
          className={`${
            location.pathname == "/" + link.url
              ? "border-bright-sun-400  text-bright-sun-400 border-t-[3px] flex"
              : "border-transparent"
          } h-full flex items-center`}
        >
          <Link key={index} to={link.url}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default NavLinks;
