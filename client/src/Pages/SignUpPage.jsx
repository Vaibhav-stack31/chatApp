import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPwd: ''
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    if (!formData.confirmPwd.trim()) return toast.error("Please confirm your password");
    if (formData.password !== formData.confirmPwd) return toast.error("Passwords do not match");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signUp(formData)
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-1">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 p-4 shadow-[0px_0px_14px_rgba(0,0,0,0.2)] rounded-2xl">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="form-control">
              <div className="flex w-full items-center border input input-bordered px-3 gap-2">
                <User className="size-5 text-base-content/40" />
                <input
                  type="text"
                  className="w-full bg-transparent outline-none "
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <div className="flex w-full items-center border input input-bordered px-3 gap-2">
                <Mail className="size-5 text-base-content/40" />
                <input
                  type="email"
                  className="w-full bg-transparent outline-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <div className="flex w-full items-center border input input-bordered px-3 gap-2">
                <Lock className="size-5 text-base-content/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-transparent outline-none"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control">
              <div className="flex w-full items-center border input input-bordered px-3 gap-2">
                <Lock className="size-5 text-base-content/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-transparent outline-none"
                  placeholder="Confirm Password"
                  value={formData.confirmPwd}
                  onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
                />
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp} >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
