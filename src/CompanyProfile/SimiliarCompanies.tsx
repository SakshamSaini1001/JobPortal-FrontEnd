import { ScrollArea } from "@mantine/core";
import JobCard from "../FindJobs/JobCard";
import { jobList } from "../Data/JobsData";
import CompanyCard from "./CompanyCard";
import { similar } from "../Data/Company";

const SimiliarCompanies=()=>{
    return <div className="w-1/4">
        <div className="text-2xl font-semibold mb-2 ">Similiar Commpanies</div>
        <div className="flex flex-col flex-wrap gap-1">
            {
            similar.map((company, index) => <CompanyCard key={index} {...company} />)
            }
        </div>
    </div>
}
export default SimiliarCompanies;