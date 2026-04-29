import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function RegisterScreen() {
  return (
    <div className="h-screen bg-black text-white font-sans antialiased flex items-center justify-center p-6">
      <div className="flex items-center">
        <div className="lg:w-[365px] mx-auto space-y-6">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-semibold">
              Create an account
            </h1>
            <p className="text-neutral-400 text-sm">
              Enter your information below to create your account
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <div className="">
                <label className="text-xs text-neutral-400">Full Name</label>
              </div>
              <Input
                type="text"
                placeholder="Full name"
                required
                className="border border-neutral-800"
              />
              <div>
                <label className="text-xs text-neutral-400">Email</label>
              </div>
              <Input
                type="email"
                placeholder="name@example.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-neutral-800"
              />
              <p className="text-xs text-neutral-500">
                We'll use this to contact you. We will not share your
                <br />
                email with anyone else.
              </p>
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex items-center">
                <label className="text-xs text-neutral-400">Password</label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-neutral-800"
              />
              <p className="text-xs text-neutral-500 pb-3">
                Must be at least 8 characters long.
              </p>

              <div className="flex items-center">
                <label className="text-xs text-neutral-400">
                  Confirm Password
                </label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-neutral-800"
              />
            </div>

            <Button type="submit" variant="btnLogin">
              {/* {isLoading ? "Ngecek bentar..." : "Gas Login"} */}
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
