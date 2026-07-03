import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-[420px]"
      >
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

        <p className="text-gray-500 text-center mt-2">Login to ResumePilot</p>

        <div className="mt-8">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div className="mt-5">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 ml-2">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
