import {
  Anchor,
  Button,
  Checkbox,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";
import { successNotification } from "../Services/NotificationService";
import { setUser } from "../Slices/UserSlice";
const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setformError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setformError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setformError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          successNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          console.log("Hello ", decoded);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
          setTimeout(() => {
            setLoading(false);
            //dispatch(setUser(res));
            navigate("/");
          }, 3000);
        })
        .catch((err: any) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Login Failed",
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
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />

      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-3xl font-semibold">Log In to Your Account</div>
        <TextInput
          name="email"
          value={data.email}
          error={formError.email}
          onChange={handleChange}
          withAsterisk
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Your email"
          placeholder="Your email"
        />
        <PasswordInput
          name="password"
          value={data.password}
          error={formError.password}
          onChange={handleChange}
          withAsterisk
          leftSection={
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          radius={8}
          variant="filled"
          color="teal"
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't have an account?
          <span
            onClick={() => {
              navigate("/signup");
              setformError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            SignUp
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
        >
          Forgot Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};
export default Login;
