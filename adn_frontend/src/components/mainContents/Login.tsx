import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type UserInfo = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfo>({
    username: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        alert("Đăng nhập thất bại");
      } else {
        const result = await response.json();
        console.log("Đăng nhập thành công:", result);
        alert("Đăng nhập thành công");
        navigate("/")
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi đăng nhập");
    }
  };

  return (
    <div>
      <Paper elevation={20} style={{ padding: 40, borderRadius: 20 }}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Đăng nhập
          </Typography>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            name="username"
            value={user.username}
            onChange={handleInput}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>

          <Box mt={3} textAlign="start">
            <Typography variant="body2">
              <Link to="/forget">Quên mật khẩu ? </Link>
            </Typography>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Bạn chưa có tài khoản?{"   "}
              <Link to="/signup">Đăng ký</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
export default Login;
