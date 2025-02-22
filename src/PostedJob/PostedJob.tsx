import { Tabs } from "@mantine/core";
import { activeJobs } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);
  const activeJobs =
    props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE") || [];
  const draftJobs =
    props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT") || [];
  const closedJobs =
    props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED") || [];
  const filteredJobs =
    props.jobList?.filter((job: any) => job?.jobStatus === activeTab) || [];

  return (
    <div className="w-1/6">
      <div className="text-2xl font-semibold mb-5 mt-5">Jobs</div>
      <div>
        <Tabs
          autoContrast
          variant="pills"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-40 0">
            <Tabs.Tab value="ACTIVE">Active [{activeJobs.length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT">Drafts [{draftJobs.length}]</Tabs.Tab>
            <Tabs.Tab value="CLOSED">Closed [{closedJobs.length}]</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="flex flex-col gap-3 mt-5">
          {filteredJobs.map((item: any, index: any) => (
            <PostedJobCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostedJob;
