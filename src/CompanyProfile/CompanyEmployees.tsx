import { similar } from "../Data/Company";
import { companies } from "../Data/Data";
import { talents } from "../Data/TalentData";
import TalentCards from "../FindTalent/TalentCards";
import CompanyCard from "./CompanyCard";

const CompanyEmployees=()=>{
    return <>
    <div className="mt-10  flex flex-wrap gap-4">
        {
            talents.map((talent, index)=><TalentCards key={index} {...talent}/>)}
                </div></>
}
export default CompanyEmployees;