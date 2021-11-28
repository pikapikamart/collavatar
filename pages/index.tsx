import React, { useRef } from "react";
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from "next-auth/react";


const Home: NextPage = () => {

  const handleAuthSignIn = () =>{
    signIn("github", {callbackUrl: "http://localhost:3000/user/configure"});
  }

  const handleAuthSignOut = () =>{
    signOut();
  }

  return (
    <main>
      <button onClick={handleAuthSignIn}>Sign In</button>
      <button onClick={handleAuthSignOut}>Sign Out</button>
    </main>
  )
}

export default Home
