import * as yup from "yup";

const noSpace = /^\S+$/;

export const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required("Họ và tên là bắt buộc")
    .min(1, "Tên Quá Ngắn Và Không được bỏ trống"),
  username: yup
    .string()
    .trim()
    .required("Tài khoản là bắt buộc")
    .min(8, "Không được bỏ trống")
    .matches(noSpace, "không được có khoảng trắng"),
  email: yup
    .string()
    .trim()
    .required("Email là bắt buộc")
    .min(1, "Không được bỏ trống")
    .matches(noSpace, "không được có khoảng trắng"),
  password: yup
    .string()
    .trim()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Không được bỏ trống")
    .matches(/[A-Z]/, "Cần có chữ hoa")
    .matches(/[a-z]/, "Cần có chữ thường")
    .matches(/\d/, "Cần có số")
    .matches(/[@$!%*?&#]/, "Cần ký tự đặc biệt")
    .matches(/^\S+$/, "Mật khẩu không được chứa dấu cách"),
  confirmPasword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp"),

  phone: yup
    .string()
    .required("số điện thoại bắt buộc")
    .matches(/^\d{10,15}$/, "không được nhập chữ"),
});
