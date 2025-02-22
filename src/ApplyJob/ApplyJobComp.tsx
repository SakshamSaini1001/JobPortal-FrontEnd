import {
  Button,
  Divider,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBookmark,
  IconCheck,
  IconPaperclip,
} from "@tabler/icons-react";
import { useState } from "react";
import { Notification, rem } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { isFixed } from "@mantine/hooks/lib/use-headroom/use-headroom";
import { isNotEmpty, useForm } from "@mantine/form";
import { getBase64, timeAgo } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplyJobComp = (props: any) => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null as File | null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is Required"),
      email: isNotEmpty("Email is Required"),
      phone: isNotEmpty("Phone is Required"),
      website: isNotEmpty("Website is Required"),
      resume: isNotEmpty("Resume is Required"),
      coverLetter: isNotEmpty("Cover Letter is Required"),
    },
  });
  const handlePreview = () => {
    form.validate();
    window.scroll({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };
  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      applicantId: user.id,
      resume: resume.split(",")[1],
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        console.log(res);
        successNotification("Success", "Application Submitted Successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
        errorNotification("Error", err.errorMessage);
      });
  };

  return (
    <>
      <div className="w-2/3 mx-auto">
        <LoadingOverlay
          className="!fixed"
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "brightSun.4", type: "bars" }}
        />
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img
                className=" h-14"
                src={`/Icons/${props.company}.png`}
                alt=" "
              />
            </div>
            <div>
              <div className="font-semibold text-2xl">{props.jobTitle}</div>
              <div className="text-lg text-mine-shaft-300">
                {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022;{" "}
                {props.applicants ? props.applicants.length : 0}
                <> Applicants</>
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <div className="text-xl font-semibold mb-5">
          Submit your Application
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 [&>*]:w-1/2">
            <TextInput
              label="Full Name"
              withAsterisk
              placeholder="Enter Name"
              readOnly={preview}
              value={form.values.name}
              onChange={(e) => form.setFieldValue("name", e.target.value)}
            />
            <TextInput
              label="Email-id"
              withAsterisk
              placeholder="Enter Email-id"
              readOnly={preview}
              value={form.values.email}
              onChange={(e) => form.setFieldValue("email", e.target.value)}
            />
          </div>
          <div className="flex gap-5 [&>*]:w-1/2">
            <NumberInput
              label="Phone Number"
              withAsterisk
              placeholder="Enter Phone number"
              hideControls
              readOnly={preview}
              value={form.values.phone}
              onChange={(value) =>
                form.setFieldValue("phone", value ? value.toString() : "")
              }
            />
            <TextInput
              label="Personal Website"
              withAsterisk
              placeholder="Enter Website URL"
              readOnly={preview}
              value={form.values.website}
              onChange={(e) => form.setFieldValue("website", e.target.value)}
            />
          </div>
          <FileInput
            label="Attach Your CV"
            withAsterisk
            placeholder="Upload your CV"
            readOnly={preview}
            value={form.values.resume}
            onChange={(file) => form.setFieldValue("resume", file)}
          />
          <Textarea
            label="Cover Letter"
            withAsterisk
            placeholder="Type something about yourself..."
            autosize
            minRows={4}
            readOnly={preview}
            value={form.values.coverLetter}
            onChange={(e) => form.setFieldValue("coverLetter", e.target.value)}
          />{" "}
          {!preview && (
            <Button onClick={handlePreview} color="brightSun.4" variant="light">
              Preview
            </Button>
          )}
          {preview && (
            <div className=" flex gap-5 [&>*]:w-1/2">
              <Button
                fullWidth
                onClick={handlePreview}
                color="brightSun.4"
                variant="outline"
              >
                Edit
              </Button>
              <Button
                fullWidth
                onClick={handleSubmit}
                color="brightSun.4"
                variant="light"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
      <Notification
        className={`!border-bright-sun-400 !fixed  transition duration-500 ease-in-out top-0 mt-5 left-[35%] z-[1001] ${
          submit ? "translate-y-1" : "-translate-y-24"
        } `}
        icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
        color="red"
        withBorder
        title="Everything Submited"
        withCloseButton={false}
      >
        Redirecting to Find job {sec} seconds...
      </Notification>
    </>
  );
};
export default ApplyJobComp;
