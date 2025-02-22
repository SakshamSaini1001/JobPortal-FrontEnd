import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talent from "../FindTalent/Talent";

const FindTalent=()=>{
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 ">
            <Divider size="xs" mx="md"/>
            <SearchBar/>
            <Divider size="xs" mx="md"/>
            <Talent/>
        </div>

    )
}
export default FindTalent;