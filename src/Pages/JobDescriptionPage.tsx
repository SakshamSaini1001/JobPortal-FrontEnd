import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDecription";
import RecommendedJob from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => setJob(res))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
      <Divider size="xs" />
      <Link className="my-4 inline-block" to="/find-jobs">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex mt-4 gap-5 justify-around">
        <JobDesc {...job} />
        <RecommendedJob />
      </div>
    </div>
  );
};
export default JobDescriptionPage;
