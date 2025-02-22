import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    getJob(id)
      .then((res) => {
        console.log(res);
        setJob(res);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 p-4 ">
      <Link className="my-4 inline-block" to="/jobs">
        <Button
          onClick={() => navigate(-1)}
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <ApplyJobComp {...job} />
    </div>
  );
};
export default ApplyJobs;
