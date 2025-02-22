import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMockInterview } from "../Services/MockInterviewService";
import QuestionSection from "./QuestionSection";
import RecordAnswerSection from "./RecordAnswerSection";
import { Button } from "@mantine/core";

const StartInterview = () => {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeIndexQuestion, setActiveIndexQuestion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getMockInterview(id)
      .then((res) => {
        console.log(res);
        const mockResp = res.response;
        setMockInterviewQuestion(mockResp);
        console.log("hiiiiii", mockResp);
        setInterviewData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeIndexQuestion={activeIndexQuestion}
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeIndexQuestion={activeIndexQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeIndexQuestion > 0 && (
          <Button
            onClick={() => setActiveIndexQuestion(activeIndexQuestion - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeIndexQuestion < mockInterviewQuestion.length - 1 && (
          <Button
            onClick={() => setActiveIndexQuestion(activeIndexQuestion + 1)}
          >
            Next Question
          </Button>
        )}
        {activeIndexQuestion === mockInterviewQuestion.length - 1 && (
          <Button
            onClick={() =>
              navigate("/mockInterview/interview/" + id + "/feedback")
            }
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
