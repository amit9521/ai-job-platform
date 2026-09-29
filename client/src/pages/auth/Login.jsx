import { useEffect,useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!successMessage && !errorMessage) {
        return;
    }

    const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
    }, 2000);

    return () => {
        clearTimeout(timer);
    };
}, [successMessage, errorMessage]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const loginData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);

      setSuccessMessage(data.message || "Login successful");
    } catch (error) {
      console.error("Login failed:", error.message);

      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
        {/* Background glow */}
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        {/* Main Card */}
        <div className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left Section - Login Form */}
          <div className="flex min-h-[650px] items-center bg-slate-950/70 p-8 sm:p-12 lg:p-14">
            <div className="w-full max-w-md">
              {/* Branding */}
              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 font-bold">
                  AI
                </div>

                <span className="text-lg font-semibold">AI Job Platform</span>
              </div>

              {/* Heading */}
              <div>
                <p className="text-sm font-medium text-indigo-400">
                  WELCOME BACK
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Sign in to your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Continue your career journey from where you left off.
                </p>
              </div>

              {/* Form will come next */}

              {successMessage && (
                <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-10">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);

                      if (errors.email) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "",
                        }));
                      }
                    }}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-white/[0.07] focus:ring-4 ${
                      errors.email
                        ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/10"
                        : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);

                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: "",
                          }));
                        }
                      }}
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-white/[0.07] focus:ring-4 ${
                        errors.password
                          ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/10"
                          : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/10"
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.password}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Visual */}
          <div className="hidden min-h-[650px] items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-700 p-12 lg:flex">
            <div className="max-w-md">
              <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-indigo-100 backdrop-blur">
                AI-powered career workspace
              </div>

              <h2 className="text-5xl font-semibold leading-tight">
                Your next opportunity starts here.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/65">
                Analyze your resume, discover relevant jobs and keep your
                applications organized in one intelligent platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
