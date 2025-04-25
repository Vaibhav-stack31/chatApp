import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      await updateProfile({profilePic: base64Image});
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-300 rounded-2xl shadow-[0px_0px_14px_rgba(0,0,0,0.2)] p-6 space-y-10">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content">Profile</h1>
            <p className="text-sm text-zinc-400 mt-1">Your profile information</p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105 transition-transform
                  p-2 rounded-full cursor-pointer 
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Personal Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700 text-base-content">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700 text-base-content">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-200 rounded-xl p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-base-content">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
