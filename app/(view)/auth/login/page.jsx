"use client";
import socket from "@/socketInstance";
import { setCookie } from "cookies-next/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [Form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = fetch("https://chatapi.zahidhasannipu.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.token) {
          setCookie("token", data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/");
        } else {
          alert(data?.message);
        }
      });
  };
  useEffect(() => {
    if (socket.connected) {
      socket.disconnect();
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-r from-yellow-100 to-amber-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center h-full p-5">
        <div className="space-y-10 w-full p-4 lg:p-0 lg:w-[400px]">
          <div className="text-center">
            <p className="text-4xl font-bold uppercase">Welcome Back!</p>
            <small>Where are you been? They are waiting for you.</small>
          </div>

          <div>
            <div className="pb-5">
              <p className="text-2xl font-bold">Login Now!</p>
              <small>Enter your credentials and enjoy!</small>
            </div>
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-6">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="border border-black/10 p-2 rounded-md focus:outline-none"
                  value={Form.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="border border-black/10 p-2 rounded-md focus:outline-none"
                  value={Form.password}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-black text-white p-2 rounded-md cursor-pointer hover:bg-black/80 duration-150 scale-100 active:scale-95"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className=" w-[800px] h-[800px] overflow-hidden rounded-3xl relative">
            <Image
              src="/main.jpg"
              width={800}
              height={500}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="firstmsg absolute top-[20%] left-[5%]">
            <div className="flex items-center gap-x-3 bg-white/70 p-2 rounded-md">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <Image
                  src="/main.jpg"
                  width={50}
                  height={50}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-4">
                <p className="font-bold text-black/70">Anita</p>
                <p className="text-sm font-bold text-black/70">
                  Hey baby! wanna come to my home
                </p>
              </div>
            </div>
          </div>
          <div className="firstmsg absolute top-[30%] left-[30%]">
            <div className="flex items-center gap-x-3 bg-white/70 p-2 rounded-md">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <Image
                  src="/user.jpg"
                  width={50}
                  height={50}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-4">
                <p className="font-bold text-black/70">Amit</p>
                <p className="text-sm font-bold text-black/70">
                  Let's have fun babyyyy!
                </p>
              </div>
            </div>
          </div>
          <div className="firstmsg absolute top-[40%] left-[5%]">
            <div className="flex items-center gap-x-3 bg-white/70 p-2 rounded-md">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <Image
                  src="/main.jpg"
                  width={50}
                  height={50}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-4">
                <p className="font-bold text-black/70">Anita</p>
                <p className="text-sm font-bold text-black/70">
                  Yessssssssss!❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
