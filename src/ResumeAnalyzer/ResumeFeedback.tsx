import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchInterviewAnswersBymockIdRef } from "../Services/MockInterviewService";
import { useEffect, useState } from "react";
import { Button, Card, Collapse, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronDownLeft,
  IconChevronsDown,
} from "@tabler/icons-react";
import { analyzeResume } from "../Services/ResumeAnalyzeService";

interface Feedback {
  rating: number;
  feedback: string;
  areas_of_improvement: string[]; // An array of strings
}

const ResumeFeedback = () => {
  // const { id } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const text = location.state?.text;

  // useEffect(() => {
  //   fetchInterviewAnswersBymockIdRef(id)
  //     .then((res) => {
  //       console.log("Fetched feedback:", res);
  //       setFeedbackList(res); // Update state with response data
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    try {
      console.log("ADAdssf", { text });
      analyzeResume(text)
        .then((response) => {
          console.log("Fetched feedback:", response);
          const mockResp = response?.feedback
            .replace("```json", "")
            .replace("```", "")
            .trim();

          console.log("Feedback Response:", mockResp);
          const jsonFeedbackResp = JSON.parse(mockResp);
          setFeedback(jsonFeedbackResp);
          console.log("Hi", jsonFeedbackResp);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  }, [text]);

  const toggleCollapse = (index: number) => {
    setOpenedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your Resume Feedback</h2>
      <h2 className="text-bright-sun-yellow-300 text-lg my-3">
        Your overall Rating is {feedback?.rating}/10
      </h2>

      {/* {Array.isArray(feedback) && feedback.length > 0 ? (
        feedback.map((item: any, index: any) => (
          <div key={index}>
            <h2 className="text-red-500 p-2 border-rounded-lg">
              <strong>Rating:</strong> {item.rating}/10
            </h2>
            <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900">
              <strong>Feedback:</strong> {item.feedback}
            </h2>
            {item.areaOfImprovement && (
              <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900">
                <strong>Area of Improvement:</strong> {item.areaOfImprovement}
              </h2>
            )}
          </div>
        ))
      ) : (
        <p>No feedback available or feedback is not an array.</p>
      )} */}

      {feedback ? (
        <>
          <div>
            <h2 className="p-2 text-lg ">
              <strong>Feedback:</strong> {feedback.feedback}
            </h2>
          </div>

          {feedback.areas_of_improvement &&
            feedback.areas_of_improvement.length > 0 && (
              <div>
                <h2 className="font-bold text-xl text-red-500 mt-4">
                  Areas of Improvement:
                </h2>
                <ul>
                  {feedback.areas_of_improvement.map((area, index) => (
                    <li key={index} className="p-2 text-lg">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
      ) : (
        <p>Loading feedback...</p>
      )}

      {/*<Card
            key={index}
            className="p-2 rounded-lg m-2 text-left gap-7 w-full"
            //shadow="sm"
            //padding="lg"
            //radius="md"
            //withBorder
            //mb="md"
          >
            <Button
              onClick={() => toggleCollapse(index)}
              fullWidth
              variant="light"
            >
              {item.question}
              <IconChevronDown className="h-5 w-5" />
            </Button>

            <Collapse
              className="flex flex-col gap-2 mt-10"
              in={openedIndex === index}
              transitionDuration={300}
            >
              <h2 className="text-red-500 p-2 border-rounded-lg">
                <strong>Rating:</strong> {item.rating}/10
              </h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                <strong>Your Answer:</strong> {item.userAnswer}
              </h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                <strong>Correct Answer:</strong> {item.correctAnswer}
              </h2>
              <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900">
                <strong>Feedback:</strong> {item.feedback}
              </h2>
            </Collapse>
          </Card>*/}

      <Button
        className="mt-7 flex justify-center items-center gap-3"
        onClick={() => navigate("/mockInterview")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default ResumeFeedback;
