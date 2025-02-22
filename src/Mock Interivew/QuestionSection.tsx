// import { IconBulb } from "@tabler/icons-react";
// import { useEffect } from "react";

import { IconBulb, IconVolume } from "@tabler/icons-react";
import { useEffect } from "react";

// const QuestionSection = ({
//   mockInterviewQuestion = [],
//   activeIndexQuestion = 0,
// }: any) => {
//   useEffect(() => {
//     console.log(mockInterviewQuestion);
//     console.log(activeIndexQuestion);
//   }, [mockInterviewQuestion, activeIndexQuestion]);
//   return (
//     <div className="p-5 border rounde-lg">
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {mockInterviewQuestion &&
//           mockInterviewQuestion.map((question: any, index: any) => (
//             <h2
//               key={index}
//               className={`p-2 bg-secondary rounded-full
//                  text-xs md:text-sm text-center cursor-pointer
//                  ${
//                    activeIndexQuestion == index &&
//                    "bg-bright-sun-500 text-white"
//                  }`}
//             >
//               Question #{index + 1}
//             </h2>
//           ))}
//       </div>
//       <h2 className="my-5 text-md md:text-lg">
//         {mockInterviewQuestion[activeIndexQuestion]?.question}
//       </h2>
//       <div className="border rounded-lg p-5 bg-bright-sun-200">
//         <h2 className="flex gap-2 items-center text-mine-shaft-950">
//           <IconBulb />
//           <strong>Note:</strong>
//         </h2>
//         <h2 className="text-sm text-mine-shaft-950 my-2">
//           Click on Record Answer when you want to answer the question. At the
//           end of interview we will give you feedback along with correct answer
//           for each of question and your answer to compare it.
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default QuestionSection;

const QuestionSection = ({
  mockInterviewQuestion = [],
  activeIndexQuestion = 0,
}: any) => {
  useEffect(() => {
    console.log("abcskcsmkcs", mockInterviewQuestion);
    console.log(activeIndexQuestion);
  }, [mockInterviewQuestion, activeIndexQuestion]);

  const textToSpeech = (text: any) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech");
    }
  };
  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.length > 0 ? (
          mockInterviewQuestion.map((question: any, index: number) => (
            <h2
              key={index} // ✅ Added `key` for React list rendering
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
                   ${
                     activeIndexQuestion === index
                       ? "bg-bright-sun-500 text-white"
                       : ""
                   }`}
            >
              Question #{index + 1}
            </h2>
          ))
        ) : (
          <p className="text-center text-gray-500">No questions available</p>
        )}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeIndexQuestion]?.question}
      </h2>
      <IconVolume
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeIndexQuestion]?.question)
        }
      />

      <div className="border rounded-lg p-5 bg-bright-sun-200">
        <h2 className="flex gap-2 items-center text-mine-shaft-950">
          <IconBulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-mine-shaft-950 my-2">
          Click on Record Answer when you want to answer the question. At the
          end of the interview, we will give you feedback along with the correct
          answer for each question and your answer to compare it.
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
