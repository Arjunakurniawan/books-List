import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth_service";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginScreen() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({
        email: formLogin.email,
        password: formLogin.password,
      });
      alert("Login successful!");
      navigate("/");
    } catch (err: any) {
      alert("Login failed. try again.");
    }
  };

  return (
    <div className="h-screen bg-black text-white font-sans antialiased flex items-center justify-center p-6">
      <div className="flex items-center">
        <div className="lg:w-[365px] mx-auto space-y-6 ">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-semibold">Login to your account</h1>
            <p className="text-neutral-400 text-sm">
              Enter your email and password to continue.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={formLogin.email}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, email: e.target.value })
                }
                required
                className="border border-neutral-800"
              />
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400">Password</label>
                <a
                  href="#"
                  className="text-xs text-neutral-500 hover:text-neutral-400 transition-all"
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={formLogin.password}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, password: e.target.value })
                }
                required
                className="border border-neutral-800"
              />
            </div>

            <Button type="submit" variant="btnLogin">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <span className="relative px-3 bg-black text-xs text-neutral-700 uppercase">
              Or continue with
            </span>
          </div>

          <Button variant="btnRegister" className="w-full">
            <div className="flex items-center justify-center gap-2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </div>
          </Button>

          {/* Link Sign Up */}
          <p className="text-center text-xs text-neutral-400">
            Don't have an account?
            <Link to="/register" className="text-white underline pl-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
