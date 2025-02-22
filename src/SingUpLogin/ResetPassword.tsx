import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP Sent Successfully", "Enter OTP to Reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP Sending Failed", err.errorMessage);
        setOtpSending(false);
      });
  };
  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        setVerified(true);
        successNotification("OTP Verified", "Enter new Password.");
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP Verification Failed", err.errorMessage);
      });
  };
  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };
  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };
  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with New Password");
        props.close();
      })
      .catch((err) => {
        errorNotification("Password Reset Failed", err.errorMessage);
      });
  };
  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          withAsterisk
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              size="xs"
              className="mr-1"
              onClick={handleSendOtp}
              autoContrast
              disabled={email === "" || otpSent}
              radius={8}
              variant="filled"
              color="teal"
            >
              Login
            </Button>
          }
          label="Your email"
          placeholder="Your email"
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            onComplete={handleVerifyOtp}
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            type="number"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              fullWidth
              loading={otpSending}
              color="brightSun.4"
              onClick={resendOtp}
              autoContrast
              variant="light"
            >
              {resendLoader ? seconds : "Resend"}
            </Button>
            <Button
              fullWidth
              onClick={changeEmail}
              autoContrast
              variant="filled"
            >
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            name="password"
            value={password}
            error={passErr}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(signupValidation("password", e.target.value));
            }}
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
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
