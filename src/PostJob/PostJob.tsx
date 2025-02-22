import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./RichTextEditor";
import { IconArrowLeft } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const select = fields;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== "0") {
      getJob(id)
        .then((res) => {
          form.setValues(res);
          setEditorData(res.description);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Job Title is Required"),
      company: isNotEmpty("Company is Required"),
      experience: isNotEmpty("Experience is Required"),
      jobType: isNotEmpty("Job Type is Required"),
      location: isNotEmpty("Location is Required"),
      packageOffered: isNotEmpty("Package Offered is Required"),
      about: isNotEmpty("About is Required"),
      description: isNotEmpty("Description is Required"),
    },
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    console.log(user.id);
    postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "ACTIVE" })
      .then((res) => {
        console.log(res);
        successNotification("Success", "Job Posted Successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Failed", err.errorMessage);
      });
  };

  const handleDraft = () => {
    console.log(form.values);
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "DRAFT" })
      .then((res) => {
        console.log(res);
        successNotification("Success", "Job Drafted Successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Failed", err.errorMessage);
      });
  };

  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="text-2xl font-semibold mb-5">PostJobs</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            {...form.getInputProps("packageOffered")}
            withAsterisk
            label="Salary"
            placeholder="Enter Salary"
            min={1}
            max={300}
            clampBehavior="strict"
          />
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          placeholder="Enter skills"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
        />
        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          className="my-3"
          label="About Company"
          autosize
          minRows={2}
          placeholder="Enter about Company.."
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 bg-mine-shaft-900">
          <div className="text-2xl font-bold">
            Job Description <span className="text-red-500">*</span>
          </div>
          <TextEditor form={form} data={editorData} />
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <Button onClick={handlePost} color="brightSun.4" variant="light">
          Public Job
        </Button>
        <Button color="brightSun.4" variant="outline" onClick={handleDraft}>
          Save as Draft
        </Button>
      </div>
    </div>
  );
};
export default PostJob;
