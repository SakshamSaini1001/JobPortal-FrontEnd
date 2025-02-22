import { ActionIcon } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconExternalLink } from "@tabler/icons-react";
const CompanyCard=(props:any)=>{
    return <><div className="flex justify-between items-center p-2 mt-5 bg-mine-shaft-900 rounded-lg">
        <div className="flex gap-2 items-center">
        <div className="p-2  bg-mine-shaft-800 rounded-md">
            <img className=" h-10" src={`/Icons/${props.name}.png`} alt=" " />
        </div>
        <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-xs text-mine-shaft-300">{props.employees}Employees</div>
        </div>
    </div>
    <ActionIcon color="brightSun.4" variant='subtle'>
        <IconExternalLink/>
            </ActionIcon>
            </div>
            </>
}
export default CompanyCard;