import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth_service";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      alert("Registration successful! Please log in.");
    } catch (err: any) {
      if (err.response && err.response.data) {
        alert(`${err.response.data.status}`);
      }
    }
  };

  return (
    <div className="h-screen bg-black text-white font-sans antialiased flex items-center justify-center p-6">
      <div className="flex items-center">
        <div className="lg:w-[365px] mx-auto space-y-6">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-semibold">Create an account</h1>
            <p className="text-neutral-400 text-sm">
              Enter your information below to create your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <div>
                <label className="text-xs text-neutral-400">Full Name</label>
              </div>
              <Input
                type="text"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="border border-neutral-800"
              />
              <div>
                <label className="text-xs text-neutral-400">Email</label>
              </div>
              <Input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="border border-neutral-800"
              />
              <p className="text-xs text-neutral-500">
                We'll use this to contact you. We will not share your
                <br />
                email with anyone else.
              </p>
            </div>
            <div>
              <label className="text-xs text-neutral-400">role</label>
            </div>
            <Input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
              className="border border-neutral-800"
            />

            <div className="space-y-1.5 relative">
              <div className="flex items-center">
                <label className="text-xs text-neutral-400">Password</label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="border border-neutral-800"
              />
              <p className="text-xs text-neutral-500 pb-3">
                Must be at least 8 characters long.
              </p>
            </div>

            <Button type="submit" variant="btnLogin">
              Create a Account
            </Button>
          </form>
          <p className="text-center text-xs text-neutral-400">
            Already have an account?
            <Link to="/login" className="text-white underline pl-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
