import { useForm } from "react-hook-form";
import { signupUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      const data = await signupUser(formData);

      localStorage.setItem("token", data.token);

      toast.success("Account Created Successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-[430px]"
      >
        <h1 className="text-3xl font-bold text-center">Create Account</h1>

        <p className="text-center text-gray-500 mt-2">Join ResumePilot</p>

        <div className="mt-6">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("name", {
              required: "Name is required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div className="mt-5">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mt-5">
          <label>Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div className="mt-5">
          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-8"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
