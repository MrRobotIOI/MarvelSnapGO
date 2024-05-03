"use client";
import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";


function SigninButton() {

    const {data: session} = useSession();
    if (session && session.user){
        return (
            <div className={"pt-4"}>
              <div className={"inline-block pt-2"}>
                    {session.user.name}
              </div>
                <button
                    className={"inline-block float-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"}
                    onClick={() => signOut()}>
                  <span
                      className=" pr-3.5 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">

                    Sign Out
                  </span>
                </button>
            </div>
    )
    }
    return (
        <button onClick={() => signIn()}>
            Sign In
        </button>
    );
    }

export default SigninButton;