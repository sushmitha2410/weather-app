"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      router.push("/weather");
    } else {
      router.push("/");
    }
  }, [router]);

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    router.push("/weather");
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="w-full">
        <Image
          className="w-full h-full md:h-screen lg:h-screen"
          src="/home.jpg"
          alt="home"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center py-3">
        <h1 className="text-center text-xl py-5">Login to your account</h1>
        <form className="flex flex-col text-sm w-2/3" onSubmit={HandleSubmit}>
          <label className="mb-5">
            Name<p className="inline text-red-600">*</p>
            <input
              type="text"
              name="name"
              className="border p-3 mt-1 w-full rounded-md"
              value={formData.name}
              onChange={HandleChange}
              placeholder="Input your name"
              required
            />
          </label>
          <label className="mb-5">
            Phone<p className="inline text-red-600">*</p>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={HandleChange}
              className="border p-3 mt-1 w-full rounded-md"
              placeholder="Input your phone"
              required
            />
          </label>
          <label className="mb-5">
            Email<p className="inline text-red-600">*</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={HandleChange}
              className="border p-3 mt-1 w-full rounded-md"
              placeholder="Input your email"
              required
            />
          </label>
          <label className="mb-5">
            Password<p className="inline text-red-600">*</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={HandleChange}
              className="border p-3 mt-1 w-full rounded-md"
              placeholder="Input your password"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-gradient-to-t from-blue-400 to-blue-600 py-3 rounded-md text-white mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
