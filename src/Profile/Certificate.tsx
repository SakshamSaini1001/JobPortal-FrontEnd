import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import CertiCards from "./CertifiCards";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const handleClick = () => {
    setEdit(!edit);
  };
  return (
    <div className="px-4">
      <div className="text-3xl font-semibold mb-5 flex justify-between">
        Certification
        <div className=" flex gap-3">
          <ActionIcon
            onClick={() => setAddCerti(true)}
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
        {profile?.certifications?.map((certi: any, index: any) => (
          <CertiCards edit={edit} key={index} index={index} {...certi} />
        ))}
        {addCerti && <CertiInput setEdit={setAddCerti} />}
      </div>
    </div>
  );
};

export default Certificate;
