import type { NextPage } from 'next';
import { signIn, signOut, useSession } from "next-auth/react";


const Home: NextPage = () => {

  const handleAuthSignIn = () =>{
    signIn("github");
  }

  const handleAuthSignOut = () =>{
    signOut();
  }

  const handleFetch = async() =>{
    fetch("/api/test");
  }

  return (
    <main>
      <button onClick={handleAuthSignIn}>Sign In</button>
      <button onClick={handleAuthSignOut}>Sign Out</button>
      <button onClick={handleFetch}>Test</button>
    </main>
  )
}

export default Home
