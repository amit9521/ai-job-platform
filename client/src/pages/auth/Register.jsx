import { useEffect, useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

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

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
    };

    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);
      setSuccessMessage(data.message || "Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrorMessage(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
        {/* Background glow */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Main Card */}
        <div className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden min-h-[650px] flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 p-12 lg:flex">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 font-bold backdrop-blur">
                  AI
                </div>

                <span className="text-xl font-semibold">AI Job Platform</span>
              </div>

              {/* Heading */}
              <div className="mt-24 max-w-lg">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-100/80">
                  Career intelligence platform
                </p>

                <h1 className="mt-5 text-5xl font-semibold leading-tight">
                  Build your career with
                  <span className="block text-indigo-100">
                    better intelligence.
                  </span>
                </h1>

                <p className="mt-6 text-lg leading-8 text-white/70">
                  Manage your profile, resumes and job applications in one
                  intelligent workspace.
                </p>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">AI</p>

                <p className="mt-1 text-sm text-white/60">Resume insights</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">Smart</p>

                <p className="mt-1 text-sm text-white/60">Job matching</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex min-h-[650px] items-center bg-slate-950/70 p-8 sm:p-12 lg:p-14">
            <div className="w-full max-w-md">
              <p className="text-sm font-medium text-indigo-400">GET STARTED</p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Start your career journey with AI-powered tools built for modern
                job seekers.
              </p>

              {/* Form will come in next step */}
              {successMessage && (
                <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-10">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);

                      if (errors.name) {
                        setErrors((prev) => ({
                          ...prev,
                          name: "",
                        }));
                      }
                    }}
                    placeholder="Amit Chaudhary"
                    className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-white/[0.07] focus:ring-4 ${
                      errors.name
                        ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/10"
                        : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/10"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div className="mt-5">
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

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
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
