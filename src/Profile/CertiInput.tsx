import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const CertiInput = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const select = fields;
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Title is Required"),
      issuer: isNotEmpty("Company is Required"),
      issueDate: isNotEmpty("Location is Required"),
      certificateId: isNotEmpty("Description is Required"),
    },
  });
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const handleSave = () => {
    if (!form.validate().hasErrors) {
      // Ensure certifications is an array or initialize it as an empty array
      const certi = Array.isArray(profile.certifications)
        ? [...profile.certifications]
        : [];

      // Add the new certification to the array
      certi.push({
        ...form.values,
        issueDate: form.values.issueDate?.toISOString(),
      });

      // Dispatch the updated profile
      dispatch(
        changeProfile({
          ...profile,
          certifications: certi,
        })
      );

      // Show a success notification and exit edit mode
      successNotification("Success", "Certificate added successfully");
      props.setEdit(false);
    }
  };

  //   const handleSave = () => {
  //     form.validate();
  //     if (!form.isValid()) return;
  //     let certi = { ...profile.certifications };
  //     certi.push(form.getValues());
  //     certi[certi.length - 1].issueDate =
  //       certi[certi.length - 1].issueDate.toISOString();
  //     let updatedProfile = { ...props, certifications: certi };
  //     props.setEdit(false);
  //     dispatch(changeProfile(updatedProfile));
  //     successNotification("Success", `Certificate updated successfully`);
  //   };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Title"
          placeholder="Enter Title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Pick date"
          value={issueDate}
          onChange={setIssueDate}
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          withAsterisk
          label="Certificate ID"
          placeholder="Enter ID "
        />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="brightSun.4" variant="outline">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.4"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertiInput;
