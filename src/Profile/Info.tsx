import { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };
  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp: 0 },
  });
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Updated Successfully");
    console.log(updatedProfile);
  };
  return (
    <>
      <div className="flex text-3xl font font-semibold justify-between">
        {user.name}
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
          <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput form={form} name="jobTitle" {...select[0]} />
              <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput form={form} name="location" {...select[2]} />
              <NumberInput
                name="totalExp"
                label="Total Experience"
                withAsterisk
                hideControls
                min={0}
                max={50}
                {...form.getInputProps("totalExp")}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl flex gap-2 items-center">
            <IconBriefcase w-5 h-5 stroke={1.5} />
            {profile.jobTitle}
          </div>
          <div className="text-xl flex gap-2 items-center">
            <IconBriefcase w-5 h-5 stroke={1.5} />
            {profile.company}
          </div>
          <div className=" flex gap-1 items-center text-lg text-mine-shaft-400">
            <IconMapPin className="w-5 h-5" stroke={1.5} />
            {profile.location}
          </div>
          <div className=" flex gap-1 items-center text-lg text-mine-shaft-400">
            <IconBriefcase className="w-5 h-5" stroke={1.5} />
            Experience:
            {profile.totalExp} Years
          </div>
        </>
      )}
    </>
  );
};

export default Info;
