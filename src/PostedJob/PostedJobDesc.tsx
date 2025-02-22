import { Badge, Tabs } from "@mantine/core";
import AboutComp from "../CompanyProfile/AboutComp";
import CompanyEmployees from "../CompanyProfile/CompanyEmployees";
import CompanyJobs from "../CompanyProfile/CompanyJobs";
import JobDesc from "../JobDesc/JobDecription";
import { talents } from "../Data/TalentData";
import TalentCards from "../FindTalent/TalentCards";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);
  const handleTabChange = (value: any) => {
    setTab(value);
    if (value == "applicants") {
      setArr(
        props.applicants?.filter(
          (talent: any) => talent.applicationStatus == "APPLIED"
        )
      );
    } else if (value == "invited") {
      setArr(
        props.applicants?.filter(
          (talent: any) => talent.applicationStatus == "INTERVIEWING"
        )
      );
    } else if (value == "offered") {
      setArr(
        props.applicants?.filter(
          (talent: any) => talent.applicationStatus == "OFFERED"
        )
      );
    } else if (value == "rejected") {
      setArr(
        props.applicants?.filter(
          (talent: any) => talent.applicationStatus == "REJECTED"
        )
      );
    }
  };
  useEffect(() => {
    handleTabChange("overview");
  }, [props]);
  return (
    <div className="mt-5 w-3/4 px-5">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold flex items-center ">
            {props.jobTitle}
            <Badge ml="sm" variant="light" color="brightSun.4" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium text-mine-shaft-400 mb-5">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:!text-xl font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full mt-2">
                {props.jobStatus == "CLOSED" ? (
                  <JobDesc {...props} edit={true} closed />
                ) : (
                  <JobDesc {...props} edit={true} />
                )}
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                <div className="mt-10  flex flex-wrap gap-5 justify-around">
                  {arr.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCards key={index} {...talent} posted />
                    ))
                  ) : (
                    <div className="text-xl font-semibold">No Applicants</div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="invited">
                <div className="mt-10  flex flex-wrap gap-5 justify-around">
                  {arr.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCards key={index} {...talent} invited />
                    ))
                  ) : (
                    <div className="text-xl font-semibold">
                      No Invited Talents
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="offered">
                <div className="mt-10  flex flex-wrap gap-5 justify-around">
                  {arr.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCards key={index} {...talent} offered />
                    ))
                  ) : (
                    <div className="text-xl font-semibold">
                      No Offered Talents
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                <div className="mt-10  flex flex-wrap gap-5 justify-around">
                  {arr.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCards key={index} {...talent} rejected />
                    ))
                  ) : (
                    <div className="text-xl font-semibold">
                      No Rejected Talents
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold flex min-h-[70vh] justify-center items-center">
          No Job Selected
        </div>
      )}
    </div>
  );
};
export default PostedJobDesc;
