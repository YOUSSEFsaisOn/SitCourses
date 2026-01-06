"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { loginUser } from "@/services/auth-service";
import { Eye, EyeOff, Mail, Lock, Chrome, Facebook } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const authData = await loginUser(data);
      if (authData) {
        login(authData.user, authData.token);
        router.push("/dashboard");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login - in real app, this would redirect to OAuth
    console.log(`Login with ${provider}`);
    // For demo purposes, simulate successful login
    const mockUser = {
      id: "social-" + Date.now(),
      email: `${provider.toLowerCase()}@example.com`,
      name: `${provider} User`,
      role: "student" as const,
      createdAt: new Date(),
    };
    const mockToken = "mock-social-token-" + Date.now();
    login(mockUser, mockToken);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">Sign in to your LearnHub account</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleSocialLogin("Google")}
            variant="outline"
            className="w-full h-12 border-2 hover:bg-gray-50 transition-colors"
          >
            <Chrome className="h-5 w-5 mr-3 text-red-500" />
            Continue with Google
          </Button>
          <Button
            onClick={() => handleSocialLogin("Facebook")}
            variant="outline"
            className="w-full h-12 border-2 hover:bg-gray-50 transition-colors"
          >
            <Facebook className="h-5 w-5 mr-3 text-blue-600" />
            Continue with Facebook
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="pl-10 h-12 border-2 focus:border-blue-500 transition-colors"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-2">
            Demo Accounts:
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>Student:</strong> student@example.com / student123
            </p>
            <p>
              <strong>Instructor:</strong> instructor@example.com /
              instructor123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
