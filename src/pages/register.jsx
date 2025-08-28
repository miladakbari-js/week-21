import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validations/registerSchema";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";
import styles from "./Register.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data.username, data.password);
      console.log("Register successful:", res);
      toast.success("ثبت نام با موفقیت انجام شد. به صفحه ورود منتقل می شوید!");
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("نام کاربری از قبل وجود دارد!!!");
      } else {
        toast.error("دوباره تلاش کنید - ثبت نام ناموفق");
      }
    }
  };
  return (
    <div className={styles.container}>
      <h3>بوت کمپ بوتواستارت</h3>

      <div className={styles.form}>
        <div className={styles.logo}>
          <Image src="/union.svg" alt="logo icon" width={100} height={100}/>
          <span>فرم ثبت نام</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          <div className={styles.error}>{errors.username && <p>{errors.username.message}</p>}</div>

          <input
            type="password"
            placeholder="رمزعبور"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("repassword")}
          />
          <div>{errors.repassword && <p>{errors.repassword.message}</p>}</div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ثبت نام" : "ثبت نام"}
          </button>
        </form>
        <div className={styles.loginlink}>

        <Link href="/login" >حساب کاربری دارید؟</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
