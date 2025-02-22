import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandX, IconGlobe } from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { Divider } from "@mantine/core";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return location.pathname!="/signup" && location.pathname!="/login"?<div className=" pt-20 pb-5 flex gap-5 justify-around  bg-mine-shaft-950 ">
        <div className="w-1/4 flex flex-col gap-4">
            <div className="flex gap-1 items-center text-bright-sun-400">
                <IconGlobe className="h-7 w-7" stroke={2.5} />
                <div className="text-xl font-semibold font-sans">Jobster</div>
            </div>

            <div className="text-sm text-mine-shaft-300 ">Job portal with user profile, skill update, certification, work experience and admin job postings.  </div>

            <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full hover:[&>div]:cursor-pointer  hover:[&>div]:bg-mine-shaft-700">
                <div><IconBrandFacebook /></div>
                <div><IconBrandInstagram /></div>
                <div><IconBrandX /></div>
            </div>
        </div>

        {/* for link  */}

        <div className="flex justify-center gap-7">
            {
                footerLinks.map((item,index)=> <div key={index}> 
                <div className="text-lg font-semibold text-bright-sun-400 mb-4">{item.title}</div>
                {
                    item.links.map((link,index)=> <div key={index} className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out "> 
                    {link}
                    </div> )
                }    
                
                </div>)
            }
        </div>




    </div>:<> </>
}
export default Footer;


// import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconAnchor } from "@tabler/icons-react";
// import { footerLinks } from "../Data/Data";

// const Footer = () => {
//     return (
//         <div className=" text-white pb-10 pt-20  flex justify-around  bg-mine-shaft-950 ">
//             {/* Brand and Description */}
//             <div className="w-1/4 flex flex-col gap-4">
//                 <div className="flex items-center gap-2 text-bright-sun-400">
//                     <IconAnchor className="h-7 w-7" stroke={2.5} />
//                     <div className="text-xl font-semibold">JobHook</div>
//                 </div>
//                 <div className="text-sm text-mine-shaft-300">
//                     Job portal with user profiles, skill updates, certifications, work experience and admin job postings.
//                 </div>

//                 {/* Social Icons */}
//                 <div className="flex gap-3 mt-4">
//                     <div className="bg-mine-shaft-700 p-2 rounded-full hover:bg-mine-shaft-500 cursor-pointer">
//                         <IconBrandFacebook />
//                     </div>
//                     <div className="bg-mine-shaft-700 p-2 rounded-full hover:bg-mine-shaft-500 cursor-pointer">
//                         <IconBrandInstagram />
//                     </div>
//                     <div className="bg-mine-shaft-700 p-2 rounded-full hover:bg-mine-shaft-500 cursor-pointer">
//                         <IconBrandX />
//                     </div>
//                 </div>
//             </div>

//             {/* Footer Links Section */}
//             <div className="flex gap-12">
//                 {footerLinks.map((item, index) => (
//                     <div key={index} className="flex flex-col">
//                         <div className="text-lg font-semibold text-bright-sun-400 mb-4">{item.title}</div>
//                         {item.links.map((link, linkIndex) => (
//                             <div
//                                 key={linkIndex}
//                                 className="text-sm text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer mb-2  hover:translate-x-2 transition duration-300 ease-in-out"
//                             >
//                                 {link}
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Footer;