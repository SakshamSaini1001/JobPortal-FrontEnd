import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";

const CertiCards = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleDelete = () => {
    const certi = Array.isArray(profile.certifications)
      ? [...profile.certifications]
      : [];
    if (props.index >= 0 && props.index < certi.length) {
      certi.splice(props.index, 1);
      const updatedProfile = { ...profile, certifications: certi };
      dispatch(changeProfile(updatedProfile));
      successNotification("Success", "Certificate deleted successfully");
    } else {
      console.error("Invalid index for deletion:", props.index);
    }
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img className=" h-10" src={`/Icons/${props.issuer}.png`} alt=" " />
        </div>
        <div>
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm text-mine-shaft-300">Google </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-sm text-mine-shaft-300">{props.issueDate}</div>
          <div className="text-sm text-mine-shaft-300">
            {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            onClick={handleDelete}
            size="lg"
            color="red.5  "
            aria-label="Settings"
          >
            <IconTrash className="h-4/5 w-4/5" />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
export default CertiCards;
