import { ScrollArea } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

const RecommendedJob = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);
  useEffect(() => {
    getAllJobs()
      .then((res) => setJobList(res))
      .catch((err) => console.log(err));
  });
  const recommendedJobs = jobList
    ?.filter((job: any) => job.id !== id)
    .slice(0, 6);
  return (
    <div className="">
      <div className="text-xl font-semibold mb-5 ">Recommended Job</div>
      {/* <ScrollArea h={1300}> */}
      <div className="flex flex-col flex-wrap gap-1">
        {/* {jobList?.map(
            (jobs: any, index: number) =>
              index < 6 && id != jobs.id && <JobCard key={index} {...jobs} />
          )} */}
        {recommendedJobs?.map((job: any) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      {/* </ScrollArea> */}
    </div>
  );
};
export default RecommendedJob;
