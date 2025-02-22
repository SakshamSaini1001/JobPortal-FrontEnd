import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMockInterview } from "../Services/MockInterviewService";
import Webcam from "react-webcam";
import { IconBulb, IconCamera } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const Interview = () => {
  const { id } = useParams(); // Extract mock interview ID from URL
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  console.log("Interview ID from URL:", id);
  // const mockId = Number(id);
  // console.log("Converted mockId:", mockId, "Type:", typeof mockId);

  useEffect(() => {
    if (id) {
      getMockInterview(id)
        .then((res) => {
          console.log("Fetched Interview Data:", res);
          setInterview(res);
        })
        .catch((err) => {
          console.error("Error fetching interview:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading interview details...</p>
    );
  }

  if (!interview) {
    return (
      <p className="text-center text-red-500">No interview data available.</p>
    );
  }

  return (
    <div className="my-10 flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {" "}
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col rounded-lg border gap-5">
            <h2>
              <strong className="text-lg">Job Position : </strong>
              {interview.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description:</strong> {interview.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong> {interview.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <IconBulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable WebCam and Microphone to start your AI generated Mock
              Interview. This interview has 5 questions which you can answer and
              at last you can see your report on the basis of your answers.
              Note: We never record your video or audio. Webcam can be disabled
              by you at any time.
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {webcamEnabled ? (
            <Webcam
              className="my-5"
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 700 }}
            />
          ) : (
            <>
              <IconCamera className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                onClick={() => setWebcamEnabled(true)}
                className=" w-full"
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center my-5">
        <Link to={`/mockInterview/interview/${id}/start`} state={{ interview }}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
