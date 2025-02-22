import { Button } from "@mantine/core";
import { IconMicrophone } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import {
  getFeedback,
  saveInterviewAnswer,
} from "../Services/MockInterviewService";
import { useSelector } from "react-redux";

interface MockInterviewQuestion {
  question: string;
  answer: string;
}

interface RecordAnswerProps {
  mockInterviewQuestion: MockInterviewQuestion[];
  activeIndexQuestion: number;
  interviewData: any;
}

const RecordAnswerSection = ({
  mockInterviewQuestion = [],
  activeIndexQuestion = 0,
  interviewData = {},
}: RecordAnswerProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update user answer from results
  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(
        results
          .map((result) =>
            typeof result === "string" ? result : result?.transcript
          )
          .join(" ")
      );
    }
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();

      if (userAnswer.trim().length < 10) {
        setLoading(false);
        errorNotification("Error", "Answer is too short");
        return;
      }

      try {
        const response = await getFeedback(
          mockInterviewQuestion[activeIndexQuestion]?.question,
          userAnswer
        );

        const mockResp = response
          .replace("```json", "")
          .replace("```", "")
          .trim();

        console.log("Feedback Response:", mockResp);
        const jsonFeedbackResp = JSON.parse(mockResp);
        console.log("Hi", jsonFeedbackResp);
        console.log("AAAAAAAAAAAAAAAAAA", jsonFeedbackResp[0].feedback);

        saveInterviewAnswer({
          mockIdRef: interviewData.id,
          question: mockInterviewQuestion[activeIndexQuestion]?.question,
          correctAnswer: mockInterviewQuestion[activeIndexQuestion]?.answer,
          userAnswer: userAnswer,
          feedback: jsonFeedbackResp[0]?.feedback,
          rating: jsonFeedbackResp[0]?.rating,
          createdBy: user.id,
          createdAt: new Date().toISOString(),
        })
          .then((res) => {
            console.log(res);
            setLoading(false);
            setUserAnswer("");
            setResults([]);
            successNotification("Success", "Answer Recorded Successfully");
          })
          .catch((err) => {
            console.log(err);
            setResults([]);
            errorNotification(
              "Error",
              err.errorMessage || err.response.errorMessage
            );
          });
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-10 justify-center items-center rounded-lg p-5">
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="flex items-center justify-center my-10"
        onClick={SaveUserAnswer}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <IconMicrophone />
            "Recording"
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
