import { useNavigate, useParams } from "react-router-dom";
import { fetchInterviewAnswersBymockIdRef } from "../Services/MockInterviewService";
import { useEffect, useState } from "react";
import { Button, Card, Collapse, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronDownLeft,
  IconChevronsDown,
} from "@tabler/icons-react";

const Feedback = () => {
  const { id } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviewAnswersBymockIdRef(id)
      .then((res) => {
        console.log("Fetched feedback:", res);
        setFeedbackList(res); // Update state with response data
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleCollapse = (index: number) => {
    setOpenedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your Interview Feedback</h2>
      <h2 className="text-bright-sun-yellow-300 text-lg my-3">
        Your overall Rating is 7/10
      </h2>
      <h2 className="text-sm text-gray-400">
        Find below interview question with correct answer, your answer and
        feedback for improvement
      </h2>
      {feedbackList &&
        feedbackList.map((item: any, index: any) => (
          <Card
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
          </Card>
        ))}

      <Button
        className="mt-7 flex justify-center items-center gap-3"
        onClick={() => navigate("/mockInterview")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
