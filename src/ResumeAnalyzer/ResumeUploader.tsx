import React, { useState, useEffect } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Text, Loader, Group, Alert, Button } from "@mantine/core";
import axiosInstance from "../Interceptor/AxiosInterceptor";
import { extractText } from "../Services/ResumeAnalyzeService";
import { Navigate, useNavigate } from "react-router-dom";

const ResumeUploader = () => {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch latest uploaded resume text from backend
  // const fetchLatestResume = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user") || "");
  //     if (!user || !user.profileId) {
  //       console.error("User ID not found");
  //       return;
  //     }

  //     const response = await axiosInstance.get(`/resume/latest`, {
  //       params: { userId: user.profileId },
  //     });

  //     if (response.data) {
  //       setResumeText(response.data.extractedText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching resume:", error);
  //   }
  // };

  // ✅ Fetch resume when component mounts
  // useEffect(() => {
  //   fetchLatestResume();
  // }, []);

  const handleFileUpload = async (files: File[]) => {
    setLoading(true);
    setError("");
    setFeedback("");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      // const token = localStorage.getItem("token");
      // const user = localStorage.getItem("user"); // Fetch userId from storage

      // if (!token) throw new Error("JWT Token is missing! Please log in.");
      // if (!user) throw new Error("User data is missing! Please log in.");

      // const parsedUser = JSON.parse(user);
      // console.log(parsedUser); // Convert JSON string to object
      // const userId = parsedUser?.profileId;
      // console.log(userId); // Extract profileId

      // if (!userId)
      //   throw new Error("User ID (profileId) is missing! Please log in.");

      // ✅ Pass `userId` as a query parameter OR inside `FormData`
      // const response = await axiosInstance.post(
      //   `/resume/upload?userId=${userId}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      extractText(formData)
        .then((response) => {
          console.log("AAAAAAAAAAAAAAAA", response);
          const extractedText = response;
          if (!extractedText) {
            throw new Error("Failed to extract text from the resume.");
          }
          setResumeText(extractedText); // Optionally update the state (if needed)

          // Navigate with the extracted text directly
          navigate("/resumeanalyze/feedback", {
            state: { text: extractedText },
          });
        })
        .catch((error) => {
          console.error("Error extracting text:", error);
          setError(error.message);
        });

      // await fetchLatestResume();
      // analyzeResume(extractedText);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = async (text: string) => {
    try {
      const aiResponse = await axiosInstance.post(`/resume/analyze`, { text });

      console.log("AI Response:", aiResponse.data); // 🔍 Debugging log

      if (aiResponse.data[0] && aiResponse.data[0].generated_text) {
        setFeedback(aiResponse.data[0].generated_text); // Extract response correctly
      } else if (aiResponse.data.feedback) {
        setFeedback(aiResponse.data.feedback);
      } else {
        throw new Error("No feedback received.");
      }
    } catch (error: any) {
      console.error("AI Analysis Error:", error);
      setFeedback("Error analyzing resume. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Hi Resume Tsxt", resumeText);
  }, [resumeText]);

  return (
    <div>
      <Dropzone
        className="p-10 h-30 w-30 border rounded-lg bg-mine-shaft-900 hover:shadow-md cursor-pointer transition-all"
        onDrop={handleFileUpload}
        accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
        maxSize={5 * 1024 * 1024} // 5MB limit
        disabled={loading}
      >
        <Group style={{ minHeight: 100, cursor: "pointer" }}>
          <h2 className="font-semibold text-mine-shaft-300 text-lg text-center">
            Drag & drop your resume here, or click to select a file
          </h2>
          {/* <Text>Drag & drop your resume here, or click to select a file</Text> */}
        </Group>
      </Dropzone>

      {loading && <Loader color="blue" mt="md" />}

      {error && (
        <Alert color="red" mt="md">
          {error}
        </Alert>
      )}

      {/* {resumeText && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Extracted Resume Text:</h2>
          <Text color="gray">{resumeText}</Text>
        </div>
      )} */}

      {/* {feedback && (
        <div className="mt-4 bg-green-100 p-3 rounded-lg">
          <h2 className="text-lg font-bold">AI Feedback:</h2>
          <Text>{feedback}</Text>
        </div>
      )} */}
    </div>
  );
};

export default ResumeUploader;
