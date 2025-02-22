// import { ActionIcon } from "@mantine/core";
// import {
//   IconDeviceFloppy,
//   IconPencil,
//   IconPlus,
//   IconX,
// } from "@tabler/icons-react";
// import { useState } from "react";
// import ExpCard from "./ExpCards";
// import { useSelector } from "react-redux";
// import ExpInput from "./ExpInput";

// const Experience = () => {
//   const profile = useSelector((state: any) => state.profile);
//   const [edit, setEdit] = useState(false);
//   const [addExp, setAddExp] = useState(false);
//   const handleClick = () => {
//     setEdit(!edit);
//   };
//   return (
//     <div className="px-4 ">
//       <div className="text-3xl font-semibold mb-5 flex justify-between">
//         Experiences
//         <div className=" flex gap-3">
//           <ActionIcon
//             onClick={() => setAddExp(true)}
//             variant="subtle"
//             size="lg"
//             color="brightSun.4"
//             aria-label="Settings"
//           >
//             <IconPlus className="h-4/5 w-4/5" />
//           </ActionIcon>
//           <ActionIcon
//             onClick={handleClick}
//             variant="subtle"
//             size="lg"
//             color={edit ? "red.8" : "brightSun.4"}
//             aria-label="Settings"
//           >
//             {edit ? (
//               <IconX className="h-4/5 w-4/5" />
//             ) : (
//               <IconPencil className="h-4/5 w-4/5" />
//             )}
//           </ActionIcon>
//         </div>
//       </div>
//       <div className="flex flex-col gap-10">
//         {profile?.experiences?.map((exp: any, index: number) => (
//           <ExpCard key={index} index={index} {...exp} edit={edit} />
//         ))}
//         {addExp && <ExpInput add setEdit={setAddExp} />}
//       </div>
//     </div>
//   );
// };

// export default Experience;

import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import ExpCard from "./ExpCards";
import { useSelector } from "react-redux";
import ExpInput from "./ExpInput";

const Experience = () => {
  const profile = useSelector((state: any) => state.profile);

  // Ensure experiences is always an array
  const experiences = Array.isArray(profile.experiences)
    ? profile.experiences
    : [];

  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div className="px-4 ">
      <div className="text-3xl font-semibold mb-5 flex justify-between">
        Experiences
        <div className=" flex gap-3">
          <ActionIcon
            onClick={() => setAddExp(true)}
            variant="subtle"
            size="lg"
            color="brightSun.4"
            aria-label="Settings"
          >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
            aria-label="Settings"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {experiences.length > 0 ? (
          experiences.map((exp: any, index: number) => (
            <ExpCard key={index} index={index} {...exp} edit={edit} />
          ))
        ) : (
          <p>No experiences found.</p>
        )}
        {addExp && <ExpInput add setEdit={setAddExp} />}
      </div>
    </div>
  );
};

export default Experience;
