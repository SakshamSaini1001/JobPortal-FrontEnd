import { Button, Dialog, Input, Modal, Text, Textarea } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import { saveMockInterview } from "../Services/MockInterviewService";
import axiosInstance from "../Interceptor/AxiosInterceptor";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import Interview from "./Interview";
const AddMockInterview = () => {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [yearsOfExperience, setYearsOfExperience] = useState();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState<any>({});

  //   const submit = (e: any) => {
  //     e.preventDefault();
  //     console.log(jobPosition, jobDesc, jobExperience);
  //   };

  const form = useForm({
    initialValues: {
      jobPosition: "",
      jobDescription: "",
      yearsOfExperience: "",
    },
  });
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(`/mockInterview/generate`, {
        params: {
          jobPosition: form.values.jobPosition,
          jobDescription: form.values.jobDescription,
          yearsOfExperience: form.values.yearsOfExperience,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT or API key
          "x-api-key": process.env.REACT_APP_GEMINI_API_KEY,
        },
      });

      const data1 = response.data;
      if (!data1) throw new Error("No response from server.");

      const MockResp = data1.replace("```json", "").replace("```", "").trim();
      console.log("Hi.....", MockResp);

      let responseToSave;
      if (MockResp.interview_questions) {
        const interviewQuestions = MockResp.interviewQuestions;
        console.log("AAAAAAA", interviewQuestions);
        const parsedQuestion = JSON.parse(MockResp);
        responseToSave = parsedQuestion;
        setQuestions(parsedQuestion);
      } else {
        //const experience = Number(yearsOfExperience);
        //console.log(form.values);

        const parsedData = JSON.parse(MockResp);
        responseToSave = parsedData;

        console.log("bye   ", parsedData);
        setQuestions(parsedData);
      }
      const formattedMockInterview = {
        mockId: user.id,
        response: responseToSave,
        jobPosition: jobPosition || form.values.jobPosition,
        jobDesc: jobDescription || form.values.jobDescription,
        jobExperience: form.values.yearsOfExperience,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
      };
      console.log(formattedMockInterview);
      saveMockInterview(formattedMockInterview)
        .then((res) => {
          console.log(res);
          //setInterviewData(formattedMockInterview);
          successNotification("Success", "Job Posted Successfully");
          navigate(`/mockInterview/interview/${res.id}`, {
            state: { interviewData: formattedMockInterview },
          });
        })
        .catch((err) => {
          console.log(err);
          errorNotification("Failed", err.errorMessage);
        });
    } catch (err) {
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 h-30 w-30 border rounded-lg bg-mine-shaft-900 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="font-semibold text-mine-shaft-300 text-lg text-center">
          + Add New
        </h2>
      </div>
      <Modal
        centered
        title="Tell us more about your Interview"
        size="70%"
        opened={openDailog}
        onClose={() => setOpenDailog(false)}
      >
        <form onSubmit={submit}>
          <div>
            <h2>
              Add Details about your Job Position, Job Description and Years of
              Experience
            </h2>
            <div className="mt-7 my-3">
              <label>Job Position</label>
              <Input
                placeholder="Full Stack Developer"
                required
                {...form.getInputProps("jobPosition")}
              />
            </div>
            <div className="my-3">
              <label>Job Description</label>
              <Textarea
                placeholder="React, Angular, Java etc."
                required
                {...form.getInputProps("jobDescription")}
              />
            </div>
            <div className="my-3">
              <label>Years of Experience</label>
              <Input
                placeholder="5"
                type="number"
                max={50}
                required
                {...form.getInputProps("yearsOfExperience")}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpenDailog(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader className="animate-spin " />
              ) : (
                <>Start Interview</>
              )}
            </Button>
          </div>
        </form>
      </Modal>
      {/* {interviewData && <Interview {...interviewData} />} */}
    </div>
  );
};

export default AddMockInterview;
