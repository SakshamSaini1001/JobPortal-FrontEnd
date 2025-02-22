import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "./HomePage";
import Footer from "../Footer/Footer";
import FindJobs from "./FindJobs";
import FindTalent from "./FindTalent";
import UploadJob from "./UploadJob";
import JobDescriptionPage from "./JobDescriptionPage";
import CompanyPage from "./CompanyPage";
import ApplyJobs from "./ApplyJobPage";
import PostedJobPage from "./PostedJobPage";
import TalentProfilePage from "./TalentProfilePage";
import SingUpPage from "./SingUpPage";
import JobHistoryPage from "./JobHistoryPage";
import ProfilePage from "./ProfilePage";
import { useSelector } from "react-redux";
import ProtectedRoute from "../Services/ProtectedRoute";
import PublicRoute from "../Services/PublicRoute";
import ResumeUploader from "../ResumeAnalyzer/ResumeUploader";
import Dashboard from "../Mock Interivew/Dashboard";
import Interview from "../Mock Interivew/Interview";
import StartInterview from "../Mock Interivew/StartInterview";
import Feedback from "../Mock Interivew/Feedback";
import ResumeDashboard from "../ResumeAnalyzer/ResumeDashboard";
import ResumeFeedback from "../ResumeAnalyzer/ResumeFeedback";

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/upload-jobs" element={<UploadJob />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route path="/resumeanalyze" element={<ResumeDashboard />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
          <Route
            path="/posted-jobs/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-jobs/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <UploadJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-history"
            element={
              <ProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SingUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SingUpPage />
              </PublicRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/mockInterview" element={<Dashboard />} />
          <Route path="/mockInterview/interview/:id" element={<Interview />} />
          <Route path="/resumeanalyze/feedback" element={<ResumeFeedback />} />
          <Route
            path="/mockInterview/interview/:id/start"
            element={<StartInterview />}
          />
          <Route
            path="/mockInterview/interview/:id/feedback"
            element={<Feedback />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
