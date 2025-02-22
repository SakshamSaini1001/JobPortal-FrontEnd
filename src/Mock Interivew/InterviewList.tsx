import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchMockInterviewsByUser } from "../Services/MockInterviewService";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const user = useSelector((state: any) => state.user);
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    console.log(user.id);
    user &&
      fetchMockInterviewsByUser(user.id)
        .then((res) => {
          console.log(res);
          setInterviewList(res);
          console.log("Hii", interviewList);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-col-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview: any, index: any) => (
            <InterviewItemCard key={index} {...interview} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
