import { ActionIcon, TagsInput, Textarea } from "@mantine/core";
import {
  IconCheck,
  IconDeviceFloppy,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Skills = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills([...(profile.skills || [])]);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills: skills };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Skills Updated Successfully");
    console.log(updatedProfile);
  };
  const handleSkillsChange = (newSkills: string[]) => {
    const filteredSkills = newSkills.filter(
      (skill, index) =>
        skill.trim() !== "" && newSkills.indexOf(skill) === index
    );
    setSkills([...filteredSkills]); // Ensure new array reference
  };
  return (
    <div>
      <div className="text-3xl font-semibold mb-3 flex justify-between">
        Skills
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
          <TagsInput
            placeholder="Add your Skill"
            autoSave=""
            value={skills}
            clearable
            onChange={handleSkillsChange}
            splitChars={[",", " ", "|"]}
          />
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 w-5/6">
            {profile?.skills?.map((skills: any, index: number) => (
              <div
                key={index}
                className="text-sm font-medium text-bright-sun-400 bg-bright-sun-300 bg-opacity-15 px-3 py-1 rounded-3xl"
              >
                {skills}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Skills;
