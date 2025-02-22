import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs=()=>{
    return <div className="mt-3 ml-4 flex flex-wrap gap-5">
        {
            jobList.map((job, index)=><JobCard key={index} {...job}/>)
        }
        </div>
}
export default CompanyJobs;