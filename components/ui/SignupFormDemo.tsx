"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./imput";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";



export function SignupFormDemo() {
    const router = useRouter();
  const [username1, setUserName1] = useState("");
  const [username2, setUserName2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [errUserName1, setErrUserName1] = useState("");
  const [errUserName2, setErrUserName2] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName1(e.target.value);
    setErrUserName1("");
  };
  const handleName2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName2(e.target.value);
    setErrUserName2("");
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handlecpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  const emailValidation = (email: unknown) => {
    return String(email).toLowerCase().match("@");
  };

  const handleRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
    let isValid = true;
    if (!username1) {
      setErrUserName1("Enter your first name");
      isValid = false;
    }
    if (!username2) {
      setErrUserName2("Enter your Second name");
      isValid = false;
    }
    if (!email) {
      setErrEmail("Your Email is required");
      isValid = false;
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
        isValid = false;
      }
    }
    if (!password) {
      setErrPassword("Password is required");
      isValid = false;
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
        isValid = false;
      }
    }

    if (!cpassword) {
      setErrCPassword(" Confirm your password ");
      isValid = false;
    } else {
      if (cpassword !== password) {
        setErrCPassword("Password not matched");
        isValid = false;
      }
    }

    e.preventDefault();

    // If all validations pass, navigate to /Homepage

    if (isValid) {
        router.push("/Homepage"); // Navigate to the homepage
      }



if (username1 && username2 && email && emailValidation(email) && password && password.length >6 && cpassword === password) {
  console.log(username1, username2, email, password, cpassword)
  setUserName1("");
  setUserName2("");
  setEmail("");
  setPassword("");
  setCPassword("");
}


  };
  return (
    <div className="max-w-md flex items-center justify-center h-screen flex-col w-full   mx-auto   shadow-input ">
      <div className="border-gray-500 rounded-none md:rounded-2xl border-2 p-4 md:p-6 bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Accolade Tech
        </h2>

        <form className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
              
                onChange={handleName}
                placeholder="Tyler"
                value={username1}
                type="text"
              />
              {errUserName1 && (
                <p className=" text-red-500 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  {" "}
                  <span className=" italic font-extrabold text-base">!</span>
                  {errUserName1}
                </p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                
                onChange={handleName2}
                placeholder="Durden"
                type="text"
                value={username2}
              />

              {errUserName2 && (
                <p className=" text-red-500 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  {" "}
                  <span className=" italic font-extrabold text-base">!</span>
                  {errUserName2}
                </p>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              
              onChange={handleEmail}
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
            />
            {errEmail && (
              <p className=" text-red-500 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                {" "}
                <span className=" italic font-extrabold text-base">!</span>
                {errEmail}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              
              onChange={handlepassword}
              placeholder="••••••••"
              type="password"
              value={password}
            />
            {errPassword && (
              <p className=" text-red-500 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                {" "}
                <span className=" italic font-extrabold text-base">!</span>
                {errPassword}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Confrim password</Label>
            <Input
           
              placeholder="••••••••"
              type="password"
              onChange={handlecpassword}
              value={cpassword}
            />

            {errCPassword && (
              <p className=" text-red-500 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                {" "}
                <span className=" italic font-extrabold text-base">!</span>
                {errCPassword}
              </p>
            )}
          </LabelInputContainer>

          <button
            onClick={handleRegistration}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
