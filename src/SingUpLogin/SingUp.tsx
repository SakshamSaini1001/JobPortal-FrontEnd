import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Radio } from "@mantine/core";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const SingUp = () => {
  const [value, setValue] = useState("react");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setformError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });
    setformError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) {
        setformError({
          ...formError,
          [name]: signupValidation(name, value),
          confirmPassword: "Password do not match",
        });
      }
      setformError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }
    if (name === "confirmPassword")
      if (data.password != value)
        setformError({ ...formError, [name]: "Password do not match" });
      else setformError({ ...formError, confirmPassword: "" });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Password do not match";
      if (newFormError[key]) valid = false;
    }
    setformError(newFormError);
    if (valid === true) {
      setLoading(true);
      registerUser(data)
        .then((res: any) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err: any) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Registeration Failed",
            message: err.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  };
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />

      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-3xl font-semibold">Create Account</div>
        <TextInput
          withAsterisk
          label="Your  Name"
          value={data.name}
          error={formError.name}
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
        />
        <TextInput
          withAsterisk
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Your email"
          name="email"
          value={data.email}
          error={formError.email}
          onChange={handleChange}
          placeholder="Your email"
        />
        <PasswordInput
          withAsterisk
          leftSection={
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Password"
          name="password"
          value={data.password}
          error={formError.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <PasswordInput
          withAsterisk
          leftSection={
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Confirm Password"
          name="confirmPassword"
          value={data.confirmPassword}
          error={formError.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="Are You ?"
          withAsterisk
        >
          <Group mt="xs">
            <Radio
              className="px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>
        <Checkbox
          label={
            <>
              I accept <Anchor>terms and conditions</Anchor>
            </>
          }
          color="teal"
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          radius={8}
          variant="filled"
          color="teal"
        >
          SignUp
        </Button>
        <div className="mx-auto">
          Have a account?
          <span
            onClick={() => {
              navigate("/login");
              setformError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};
export default SingUp;
