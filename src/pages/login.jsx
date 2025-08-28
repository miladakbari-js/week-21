import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data.username, data.password);
      console.log(res);
      document.cookie = `auth_token=${res.token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;
      toast.success("Login successful!");
      router.push("/dashboard");
      console.log("Login successful: ", res);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage =
          error.response?.data.message || "Invalid username or password";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3>بوت کمپ بوتواستارت</h3>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src="./union.svg" alt="logo icon" />
          <span>فرم ورود</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          <div className={styles.error}>
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
          />
          <div className={styles.error}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "شکیبا باشید ..." : "ورود"}
          </button>
        </form>
        <div className={styles.reglink}>
          <Link href="/register">ایجاد حساب کاربری</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
