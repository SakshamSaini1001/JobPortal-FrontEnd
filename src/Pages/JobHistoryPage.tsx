import { Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import JobHistory from "../JobHistory/JobHistory";

const JobHostoryPage=()=>{
    return <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
            <Divider size="xs"/>
                <div className="my-5">
                    <JobHistory/>
            </div>
        </div>
}
export default JobHostoryPage;