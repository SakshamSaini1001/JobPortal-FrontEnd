import ResumeList from "./ResumeList";
import ResumeUploader from "./ResumeUploader";

const ResumeDashboard = () => {
  return (
    <div className="p-18 m-4">
      <h2 className="text-mine-shaft-300 text-2xl">Upload Resume to Analyze</h2>
      <div className="grid grid-col-1 md:grid-cols-3 my-5">
        <ResumeUploader />
      </div>

      <ResumeList />
    </div>
  );
};

export default ResumeDashboard;
