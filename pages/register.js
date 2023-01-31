import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNbr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const validateForm = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      phone.length > 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${process.env.API_URL}/user/addUser`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        }),
        headers: new Headers({
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
        withCredentials: true,
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success('User created, please login')
          router.push({
            pathname: "/login",
          });
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="">
            <div className="relative flex items-center h-10 my-auto">
              <Image
                className="mx-auto w-auto object-contain"
                fill
                src="/logo.png"
                alt="Logo"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="flex">
                <div className="grow">
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="fname"
                    type="text"
                    autoComplete="given-name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="relative block w-full appearance-none rounded-none rounded-tl-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div className="grow">
                  <label htmlFor="last-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="lname"
                    type="text"
                    autoComplete="family-name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    className="relative block w-full appearance-none rounded-none border rounded-tr-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="grow">
                  <label htmlFor="email-address" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <div className="grow">
                  <label htmlFor="telephone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="telephone"
                    name="phoneNbr"
                    type="text"
                    autoComplete="tel"
                    required
                    onChange={(e) => setPhoneNbr(e.target.value)}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="passwd"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={!validateForm()}
                className="group relative w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <PlusCircleIcon
                    className="h-5  w-5 text-purple-500 group-hover:text-purple-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
