import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type UserInfo = {
  username: string;
  password: string;
};

const Login = () => {
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

  return (
    <div>
      <Paper elevation={20} style={{ padding: 40, borderRadius: 20 }}>
        <Box>
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
          <Button variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Bạn chưa có tài khoản?
              <Link to="/signup">
                Đăng ký
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
export default Login;
