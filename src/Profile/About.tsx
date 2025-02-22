import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const About = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about: about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "About Updated Successfully");
    console.log(updatedProfile);
  };
  return (
    <div>
      <div className="text-3xl font-semibold mb-3 flex justify-between ">
        About
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              variant="subtle"
              size="lg"
              color="green.8"
              aria-label="Settings"
            >
              (
              <IconCheck className="h-4/5 w-4/5" />)
            </ActionIcon>
          )}

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
      {edit ? (
        <>
          <Textarea
            value={about}
            placeholder="Enter about yourself"
            autosize
            minRows={5}
            onChange={(event) => setAbout(event.currentTarget.value)}
          />
        </>
      ) : (
        <div className="text-l text-mine-shaft-300 text-justify">
          {profile.about}
        </div>
      )}
    </div>
  );
};

export default About;
