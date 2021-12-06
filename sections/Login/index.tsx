import { FC, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, InputLabel } from "@material-ui/core";
import styles from "../../styles/Login.module.css";
import { login } from "../../services/auth/auth";
import { useRouter } from "next/router";

type FormSchema = {
  username: string;
  password: string;
};

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMesage] = useState<string>("");

  const router = useRouter();

  let schema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValues({ ...values, username: event.target.value });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    setMesage("");
    if (values?.username.length && values?.password.length) {
      try {
        await login(values);
        router.push("/");
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    event?.preventDefault();
    handleLogin();
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleLogin();
    },
    validationSchema: schema,
  });

  useEffect(() => {
    if (error) {
      setMesage("Authentication Failed.");
    }
  }, [error, setMesage]);
  return (
    <div className={styles.wrapper}>
      <h2>Login</h2>
      <Formik initialValues={formik.initialValues} onSubmit={handleLogin}>
        <Form noValidate onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px" }}>
            <InputLabel {...error}>Username</InputLabel>
            <TextField
              name="username"
              fullWidth
              type="text"
              placeholder="User name"
              variant="outlined"
              style={{ marginTop: "12px" }}
              onChange={handleUsernameChange}
            />
            <ErrorMessage name="username" component="div" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <InputLabel {...error}>Password</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              className="form-control"
              style={{ marginTop: "12px" }}
              onChange={handlePasswordChange}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            <span>Login</span>
          </Button>

          {message && (
            <div>
              <div role="alert">{message}</div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
