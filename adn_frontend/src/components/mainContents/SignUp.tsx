import { useState } from "react";
import "./mainContent.css";
import { signUpSchema } from "./Validation";
import { ValidationError } from "yup";
import { Box, Button, FormHelperText, Paper, TextField, Typography } from "@mui/material";

type Info = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

const SignUp = () => {
  const [info, setInfo] = useState<Info>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlynums = value.replace(/\D/g, ""); //only get number and, remove text
      setInfo({
        ...info,
        [name]: onlynums,
      });
    } else {
      setInfo({
        ...info,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...dataToSend } = info;
    try {
      //check valid before submit form
      await signUpSchema.validate(info, { abortEarly: false }); //if false will print all error, if true just print first error

      //if error set field to empty
      setError({});

      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("Status code:", response.status);

      if (!response.ok) {
        throw new Error("Đăng ký thất bại");
      }

      const result = await response.json();
      console.log("Đăng ký thành công:", result);
      alert("Đăng Ký Thành Công");
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((item) => {
          if (item.path) {
            newErrors[item.path] = item.message;
          }
        });
        setError(newErrors);
        setError(newErrors);
      } else {
        console.error("Lỗi:", error);
        alert("Lỗi đăng ký!");
      }
    }
  };

  return (
    <Paper elevation={20} style={{ padding: 40, borderRadius: 20 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: 600 }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" gutterBottom color="blue">
            Đăng Ký
          </Typography>
          <Box mb={3}>
            <TextField
              fullWidth
              id="validationDefault01"
              name="fullName"
              label="Họ và tên"
              value={info.fullName}
              onChange={handleInput}
              error={!!error.fullName}
              helperText={error.fullName}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Tên đăng nhập"
              value={info.username}
              onChange={handleInput}
              error={!!error.username}
              helperText={error.username}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Địa chỉ email"
              type="email"
              value={info.email}
              onChange={handleInput}
              error={!!error.email}
              helperText={error.email}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              aria-describedby="rulePass"
              value={info.password}
              onChange={handleInput}
              error={!!error.password}
              helperText={error.password}
            />
            <FormHelperText id="rulePass" sx={{ textAlign: "left" }}>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Có ít nhất 8 ký tự</li>
                <li>Có ít nhất 1 chữ thường và hoa</li>
                <li>Có ít nhất 1 ký tự đặc biệt</li>
                <li>Có ít nhất 1 chữ số</li>
              </ul>
            </FormHelperText>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              type="password"
              value={info.confirmPassword}
              onChange={handleInput}
              error={!!error.confirmPassword}
              helperText={error.confirmPassword}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Số điện thoại"
              type="tel"
              value={info.phone}
              onChange={handleInput}
              error={!!error.phone}
              helperText={error.phone}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ display: "flex" }}
          >
            Đăng Ký
          </Button>
        </Box>
    </Paper>
  );
};

export default SignUp;
