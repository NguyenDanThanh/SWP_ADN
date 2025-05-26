import { useState } from "react";
import "./mainContent.css";
import { signUpSchema } from "./validation";
import { ValidationError } from "yup";

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
    <form className="sign-up" onSubmit={handleSubmit}>
      <div className="mb-3 text-start " style={{ width: 600 }}>
        <label htmlFor="fullname" className="form-label">
          Họ và tên
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          name="fullName"
          value={info.fullName}
          onChange={handleInput}
        />
        {error.fullName && <div className="text-danger">{error.fullName}</div>}
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="username" className="form-label">
          Tên đăng nhập
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={info.username}
          onChange={handleInput}
        />
        {error.username && <div className="text-danger">{error.username}</div>}
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="email" className="form-label">
          Địa chỉ email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={info.email}
          onChange={handleInput}
        />
        {error.email && <div className="text-danger">{error.email}</div>}
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          aria-describedby="rulePass"
          value={info.password}
          onChange={handleInput}
        />
        {error.password && <div className="text-danger">{error.password}</div>}
      </div>
      <div id="rulePass" className="form-text">
        Ràng buộc
      </div>
      <div className="mb-3 text-start">
        <label htmlFor="confirmPassword" className="form-label">
          Nhập lại mật khẩu
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={info.confirmPassword}
          onChange={handleInput}
        />
        {error.confirmPassword && (
          <div className="text-danger">{error.confirmPassword}</div>
        )}
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="phone" className="form-label">
          Số điện thoại
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={info.phone}
          onChange={handleInput}
        />
        {error.phone && <div className="text-danger">{error.phone}</div>}
      </div>

      <button type="submit" className="btn btn-primary d-flex">
        Submit
      </button>
    </form>
  );
};

export default SignUp;
