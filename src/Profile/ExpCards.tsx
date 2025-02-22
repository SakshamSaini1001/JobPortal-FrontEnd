import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const ExpCard = (props: any) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const handleDelete = () => {
    const updatedExperiences = [...profile.experiences];
    updatedExperiences.splice(props.index, 1);

    // Update the profile object with the modified experiences array.
    const updatedProfile = { ...profile, experiences: updatedExperiences };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Experience deleted successfully");
  };
  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className=" h-10"
              src={`/Icons/${props.company}.png`}
              alt=" "
            />
          </div>
          <div>
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300 flex flex-col gap-1">
          <div>{formatDate(props.startDate)}</div>
          <div>{props.working ? "Present" : formatDate(props.endDate)}</div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-3">
          <Button
            onClick={() => setEdit(true)}
            color="brightSun.4"
            variant="outline"
          >
            Edit
          </Button>
          <Button onClick={handleDelete} color="red.4" variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};
export default ExpCard;
