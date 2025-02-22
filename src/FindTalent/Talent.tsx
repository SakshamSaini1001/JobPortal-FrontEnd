import { useEffect, useState } from "react";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCards";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Talent = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState<any>([]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);
  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (sort == "Experience(Low to High)") {
      setTalents(
        [...talents].sort((a: any, b: any) => a.totalExp - b.totalExp)
      );
    } else if (sort == "Experience(High to Low)") {
      setTalents(
        [...talents].sort((a: any, b: any) => b.totalExp - a.totalExp)
      );
    } else if (sort == "Relevance") {
      dispatch(resetSort());
    }
  }, [sort]);
  useEffect(() => {
    let filtertalent = talents;
    console.log(filter);
    if (filter.name) {
      filtertalent = filtertalent.filter((talent: any) =>
        talent.name?.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter["Job Title"].some((jobTitle: any) =>
          talent.jobTitle?.toLowerCase().includes(jobTitle.toLowerCase())
        )
      );
    }
    if (filter["Location"] && filter["Location"].length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter["Location"].some((location: any) =>
          talent.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter["Skills"] && filter["Skills"].length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter["Skills"]?.some((skill: any) =>
          talent.skills?.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if (filter.exp && filter.exp.length > 0) {
      filtertalent = filtertalent.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );
    }
    setFilteredTalents(filtertalent);
  }, [filter, talents]);
  return (
    <div className="px-5 py-5 m-2">
      <div className=" mt-5 flex justify-between">
        <div className="font-semibold text-2xl">Talents</div>
        <Sort />
      </div>
      <div className="mt-10  flex flex-wrap gap-5 m-10 justify-between">
        {filteredTalents.length ? (
          filteredTalents.map((talent: any, index: any) => (
            <TalentCards key={index} {...talent} />
          ))
        ) : (
          <div className="text-2xl font-semibold">No Talent Found</div>
        )}
      </div>
    </div>
  );
};
export default Talent;
