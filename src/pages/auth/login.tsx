import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/utils/apiHelper";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const { setAdmin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = await login(data.email, data.password);
      if (response?.data) {
        setAdmin({
          name: response.data.data.name,
          email: response.data.data.email,
        });
      }
      navigate("/dashboard");
    } catch (error) {}
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:w-96"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email wajib diisi" })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password wajib diisi" })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mx-auto">
            <Button type="submit" size={"lg"}>
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
