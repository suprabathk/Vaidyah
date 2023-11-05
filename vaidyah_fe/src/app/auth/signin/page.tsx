"use client";

import { getUser, isUserValid, signin } from "@/pb/pb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    signin(data)
      .then(() => {
        setLoading(false);
        router.replace("/");
      })
      .catch((responseError) => {
        const e: {
          message: string;
          data: {
            email?: {
              code: string;
              message: string;
            };
            password?: {
              code: string;
              message: string;
            };
          };
        } = responseError.data;
        setLoading(false);
        setError("root", { message: e.message });

        setError("email", { message: e.data.email?.message });
        setError("password", { message: e.data.password?.message });
      });
  };

  useEffect(() => {
    getUser() && router.replace("/");
  }, [router]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white px-12 md:px-24 flex flex-col items-start h-full justify-center"
    >
      <h2 className="font-space-grotesk font-bold text-5xl">
        Welcome back to <br />
        <Link href="/" className="text-violet-600">
          Vaidyah
        </Link>
      </h2>
      <p className="font-lexend-deca mt-3 mb-3 text-gray-600">
        Sign in to your account.
      </p>
      <div className="mb-3">
        <span className="text-red-500">{errors.root?.message}</span>
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <span className="text-red-500">{errors.email?.message}</span>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="john.doe@company.com"
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <span className="text-red-500">{errors.password?.message}</span>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-fit bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition-colors"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="font-lexend-deca mt-3 mb-6 text-gray-600">
        <span>Don&apos;t have an account? </span>
        <Link
          className="text-violet-600 hover:text-violet-700 hover:underline transition-colors"
          href="/auth/signup"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
