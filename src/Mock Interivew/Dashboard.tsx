import AddMockInterview from "./AddMockInterview";
import InterviewList from "./InterviewList";

const Dashboard = () => {
  return (
    <div className="p-18 m-4">
      <h2 className="text-mine-shaft-300 text-2xl">Prepare for Interview</h2>
      <div className="grid grid-col-1 md:grid-cols-3 my-5">
        <AddMockInterview />
      </div>

      <InterviewList />
    </div>
  );
};

export default Dashboard;
