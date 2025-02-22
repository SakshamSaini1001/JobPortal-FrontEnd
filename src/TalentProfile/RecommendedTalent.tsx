import { ScrollArea } from "@mantine/core";
import { talents } from "../Data/TalentData";
import TalentCards from "../FindTalent/TalentCards";
import { useParams } from "react-router-dom";

const RecommendedTalent = (props: any) => {
  const { id } = useParams();
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Talent</div>
      <ScrollArea h={1500}>
        <div className="flex flex-col flex-wrap gap-5 mt-10">
          {
            props?.talents.map(
              (talent: any, index: any) =>
                index < 4 &&
                id != talent.id && <TalentCards key={index} {...talent} />
            )
            // props?.talents.map((talent: any, index: any) => (
            //   <TalentCards key={index} {...talent} />
            // ))
          }
        </div>
      </ScrollArea>
    </div>
  );
};
export default RecommendedTalent;
