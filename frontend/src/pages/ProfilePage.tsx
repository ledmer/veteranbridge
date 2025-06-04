import React, { useEffect, useState, useRef } from "react";
import axios from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const tagOptions = [
  "Job",
  "Mental Health",
  "Wellness",
  "Engagement",
  "Hobby",
  "Other",
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, fetchUser, setUser } = useAuthStore();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem("access"));
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access"));
    async function fetchData() {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    }
    if (isLoggedIn) fetchData();
  }, [fetchUser, isLoggedIn]);

  useEffect(() => {
    if (!loading && (!user || !isLoggedIn)) {
      navigate("/"); // redirect to home if not authenticated
    } else if (user) {
      setForm({
        ...user,
        tags: user.tags ? user.tags.split(",") : [],
        fullName:
          (user.first_name || "") +
          (user.last_name ? " " + user.last_name : ""),
      });
      setProfilePic(user.profile_pic || null);
    }
  }, [user, loading, isLoggedIn, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTagChange = (tag: string) => {
    const tags = form.tags || [];
    if (tags.includes(tag)) {
      setForm({ ...form, tags: tags.filter((t: string) => t !== tag) });
    } else {
      setForm({ ...form, tags: [...tags, tag] });
    }
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
      setForm({ ...form, profile_pic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      // Split fullName into first_name and last_name
      let first_name = form.fullName?.split(" ")[0] || "";
      let last_name = form.fullName?.split(" ").slice(1).join(" ") || "";
      const payload = {
        ...form,
        first_name,
        last_name,
        tags: (form.tags || []).join(","),
        profile_pic: profilePic,
      };
      delete payload.fullName;
      await axios.patch("/api/users/me/", payload);
      setUser({ ...user, ...payload });
      setEdit(false);
    } catch (e) {
      // handle error
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <>
      <Navigation />
      <div className="max-w-xl p-8 mx-auto mt-8 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">My Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profilePic || "/placeholder.svg"}
              alt="Profile"
              className="object-cover w-24 h-24 border-2 border-blue-200 rounded-full"
            />
            {edit && (
              <button
                className="absolute bottom-0 right-0 p-1 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => fileInputRef.current?.click()}
              >
                Edit
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePicChange}
            />
          </div>
        </div>
        <div className="space-y-4">
          {edit ? (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Username
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="username"
                  value={form.username || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Full Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  value={form.fullName || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Job</label>
                <input
                  name="job"
                  value={form.job || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Mental Health
                </label>
                <input
                  name="mental_health"
                  value={form.mental_health || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Wellness</label>
                <input
                  name="wellness"
                  value={form.wellness || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Engagement
                </label>
                <input
                  name="engage"
                  value={form.engage || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Location</label>
                <input
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Gender</label>
                <input
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Age</label>
                <input
                  name="age"
                  value={form.age || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Hobby</label>
                <input
                  name="hobby"
                  value={form.hobby || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              {/* Password field (edit only) */}
              <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="new-password"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold">Username:</div>
                  <div>{form.username}</div>
                </div>
                <div>
                  <div className="font-semibold">Email:</div>
                  <div>{form.email}</div>
                </div>
                <div>
                  <div className="font-semibold">Full Name:</div>
                  <div>{form.fullName}</div>
                </div>
                <div>
                  <div className="font-semibold">Phone:</div>
                  <div>{form.phone}</div>
                </div>
                <div>
                  <div className="font-semibold">Job:</div>
                  <div>{form.job}</div>
                </div>
                <div>
                  <div className="font-semibold">Mental Health:</div>
                  <div>{form.mental_health}</div>
                </div>
                <div>
                  <div className="font-semibold">Wellness:</div>
                  <div>{form.wellness}</div>
                </div>
                <div>
                  <div className="font-semibold">Engagement:</div>
                  <div>{form.engage}</div>
                </div>
                <div>
                  <div className="font-semibold">Location:</div>
                  <div>{form.location}</div>
                </div>
                <div>
                  <div className="font-semibold">Gender:</div>
                  <div>{form.gender}</div>
                </div>
                <div>
                  <div className="font-semibold">Age:</div>
                  <div>{form.age}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-semibold">Description:</div>
                  <div>{form.description}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-semibold">Hobby:</div>
                  <div>{form.hobby}</div>
                </div>
              </div>
            </>
          )}
          {/* Tags/Labels */}
          <div>
            <label className="block mb-1 text-sm font-medium">Tags/Labels</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-3 py-1 rounded-full border ${
                    form.tags?.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => edit && handleTagChange(tag)}
                  disabled={!edit}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          {edit ? (
            <>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
