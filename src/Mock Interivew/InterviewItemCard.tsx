import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const InterviewItemCard = (interview: any) => {
  const navigate = useNavigate();
  const onStart = () => {
    navigate("/mockInterview/interview/" + interview?.id);
  };
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-bright-sun-300">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm text-gray-600">{interview?.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          onClick={() =>
            navigate("/mockInterview/interview/" + interview?.id + "/feedback")
          }
          size="sm"
          variant="outline"
          className="w-full"
        >
          Feedback
        </Button>
        <Button onClick={onStart} size="sm">
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
