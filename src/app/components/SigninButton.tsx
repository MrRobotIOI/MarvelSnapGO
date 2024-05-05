"use client";
import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";


function SigninButton() {

    const {data: session} = useSession();
    if (session && session.user){
        return (
            <div className={"pt-4"}>
              <div className={"pl-3 inline-block pt-2 font-mono hover:antialiased hover:animate-pulse"}>
                    {session.user.name}
              </div>
                <button
                    className={"inline-block float-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white border-transparent focus:border-transparent focus:ring-0"}
                    onClick={() => signOut()}>
                  <span
                      className=" pr-3.5 relative px-5 py-2.5 transition-all ease-in duration-300 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">

                    Sign Out
                  </span>
                </button>
            </div>
    )
    }
    return (
        <div className={"pt-4"}>
        <button
            className={"inline-block float-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white border-transparent focus:border-transparent focus:ring-0"}
            onClick={() => signIn()}>
             <span
                 className=" pr-3.5 relative px-5 py-2.5 transition-all ease-in duration-300 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">

            Sign In
             </span>
        </button>
        </div>
);
}

export default SigninButton;