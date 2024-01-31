import {
  Button,
  Input,
  Label,
  Toast,
  ToastTitle,
  Toaster,
  makeStyles,
  shorthands,
  useId,
  useToastController,
} from "@fluentui/react-components";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// axios.defaults.withCredentials = true;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "450px",
    height: "100vh",
  },
});

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const styles = useStyles();
  const inputAccount = useId("account");
  const [account, setAccount] = useState("");

  const inputPassword = useId("password");
  const [password, setPassword] = useState("");

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const notify = (message: string) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position: "top", intent: "error" }
    );
  };

  const login = () => {
    axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        username: account,
        password: password,
      },
      withCredentials: true,
    })
      .then(({ data }) => {
        if (data) {
          navigate({
            to: "/admin",
          });
        }
      })
      .catch((error: AxiosError) => {
        notify(error.message);
      });
  };

  return (
    <div className={styles.root}>
      <Label htmlFor={inputAccount}>帳號</Label>
      <Input
        id={inputAccount}
        value={account}
        onChange={(e) => {
          setAccount(e.target.value);
        }}
      />
      <Label htmlFor={inputPassword}>密碼</Label>
      <Input
        id={inputPassword}
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button appearance="primary" onClick={login}>
        登入
      </Button>
      <Toaster toasterId={toasterId} />
    </div>
  );
}
