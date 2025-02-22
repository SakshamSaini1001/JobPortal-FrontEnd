import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimiliarCompanies from "../CompanyProfile/SimiliarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 p-4">
      <Divider size="xs" />
      <Button
        my="4"
        leftSection={<IconArrowLeft size={20} />}
        onClick={() => navigate(-1)}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>
      <div className="flex mt-4 gap-4">
        <Company />
        <SimiliarCompanies />
      </div>
    </div>
  );
};
export default CompanyPage;
