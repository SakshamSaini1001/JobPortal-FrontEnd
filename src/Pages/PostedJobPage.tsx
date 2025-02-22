import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimiliarCompanies from "../CompanyProfile/SimiliarCompanies";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        if (res && res.length > 0 && Number(id) == 0) {
          navigate(`/posted-jobs/${res[0].id}`);
        }
        setJob(res.find((item: any) => item.id == id));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
      <Divider size="xs" />
      <div className="flex mt-4 gap-4">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};
export default PostedJobPage;
