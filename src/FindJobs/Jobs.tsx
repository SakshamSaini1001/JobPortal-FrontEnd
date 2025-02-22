import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filteredJobs, setFilteredJobs] = useState<any>([]);
  const [jobList, setJobList] = useState<any[]>([]);
  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
        console.log(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (sort == "Most Recent") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary(Low to High)") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => a.packageOffered - b.packageOffered
        )
      );
    } else if (sort == "Salary(High to Low)") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => b.packageOffered - a.packageOffered
        )
      );
    } else if (sort == "Relevance") {
      dispatch(resetSort());
    }
  }, [sort]);
  useEffect(() => {
    let filtertalent = jobList;
    console.log(filter);
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtertalent = filtertalent.filter((job: any) =>
        filter["Job Title"].some((jobTitle: any) =>
          job.jobTitle?.toLowerCase().includes(jobTitle.toLowerCase())
        )
      );
    }
    if (filter["Experience"] && filter["Experience"].length > 0) {
      filtertalent = filtertalent.filter((job: any) =>
        filter["Experience"].some((x: any) =>
          job.Experience?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter["Location"] && filter["Location"].length > 0) {
      filtertalent = filtertalent.filter((job: any) =>
        filter["Location"].some((location: any) =>
          job.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter["Skills"] && filter["Skills"].length > 0) {
      filtertalent = filtertalent.filter((job: any) =>
        filter["Skills"]?.some((skill: any) =>
          job.skills?.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filtertalent = filtertalent.filter((job: any) =>
        filter["Job Type"].some((jobType: any) =>
          job.jobType?.toLowerCase().includes(jobType.toLowerCase())
        )
      );
    }
    if (filter.salary && filter.salary.length > 0) {
      filtertalent = filtertalent.filter(
        (job: any) =>
          filter.salary[0] <= job.packageOffered &&
          job.packageOffered <= filter.salary[1]
      );
    }
    setFilteredJobs(filtertalent);
  }, [filter, jobList]);
  return (
    <div className=" px-5 py-5 ">
      <div className="m-2 flex justify-between">
        <div className="font-semibold text-2xl">Recommended Jobs</div>
        <Sort sort="job" />
      </div>
      <div className="mt-10 flex flex-wrap gap-4 m-4 justify-between">
        {filteredJobs.map((job: any, index: any) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};
export default Jobs;
