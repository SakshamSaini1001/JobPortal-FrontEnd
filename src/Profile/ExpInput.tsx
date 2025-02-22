import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpInput = (props: any) => {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        location: props.location,
        description: props.description,
        working: props.working,
      });
    }
  }, []);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
      description: "",
    },
    validate: {
      title: isNotEmpty("Title is Required"),
      company: isNotEmpty("Company is Required"),
      location: isNotEmpty("Location is Required"),
      description: isNotEmpty("Description is Required"),
    },
  });
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    const updatedExp = Array.isArray(profile.experiences)
      ? [...profile.experiences]
      : [];

    const newExperience = {
      ...form.getValues(),
      startDate: form.getValues().startDate.toISOString(),
      endDate: form.getValues().working
        ? null
        : form.getValues().endDate.toISOString(),
    };
    if (props.add) {
      updatedExp.push(newExperience);
    } else {
      updatedExp[props.index] = newExperience;
    }
    const updatedProfile = { ...profile, experiences: updatedExp };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(
      "Success",
      `Experience ${props.add ? "added" : "updated"} successfully`
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        label="Sumarry"
        placeholder="Enter Sumarry"
        autosize
        minRows={5}
      />
      <div className=" flex gap-10 [&>*]:w-1/2 ">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          withAsterisk
          maxDate={form.getValues().endDate || undefined}
          label="Start Date"
          placeholder="Pick date"
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          disabled={form.getValues().working}
          withAsterisk
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          label="End Date"
          placeholder="Pick date"
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(event) =>
          form.setFieldValue("working", event.currentTarget.checked)
        }
        label="Currently working here"
      />
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
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
export default ExpInput;
