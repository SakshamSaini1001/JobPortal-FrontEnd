import { Avatar, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";
import SimiliarCompanies from "./SimiliarCompanies";

const Company =(props:any)=>{
    return <div className="w-3/4">
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner.jpg"/>
            <img className="w-36 h-36 rounded-full -bottom-1/3 absolute left-3  border-mine-shaft-950 border-8" src="/Icons/Google.png"/>
        </div>
        <div className="px-3 mt-20">
            <div className="flex text-3xl font font-semibold justify-between">Satyam Sharma 
                <Avatar.Group>
                    <Avatar src="avatar.png" />
                    <Avatar src="avatar2.png" />
                    <Avatar src="avatar1.png" />
                    <Avatar>+10k</Avatar>
                </Avatar.Group>
            </div>
            <div className="text-xl flex gap-2 items-center"><IconBriefcase w-5 h-5 stroke={1.5}/>Software Engineer &bull; Google</div>
            <div className=" flex gap-1 items-center text-lg text-mine-shaft-400">
                <IconMapPin className="w-5 h-5" stroke={1.5}/>New York,United States
            </div>
        </div>
        <Divider my="xl"/>
        <div>
            <Tabs variant="outline" radius="lg" defaultValue="about">
    <Tabs.List  className="[&_button]:!text-xl font-semibold [&_button[data-active='true']]:text-bright-sun-400">
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
        <Tabs.Tab value="employees">Employees</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
    <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
    <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
    </Tabs>
        </div>
    </div>
}
export default Company;