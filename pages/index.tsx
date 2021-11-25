import React, { useRef } from "react";
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from "next-auth/react";


const Home: NextPage = () => {
  const image = useRef<HTMLImageElement | null>(null);
  const { data: session  } = useSession();
  console.log(session);

  const handleAuthSignIn = () =>{
    signIn("github");
  }

  const handleAuthSignOut = () =>{
    signOut();
  }

  const handleFetch = async() =>{
    fetch("/api/test");
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    // @ts-ignore
    const file = event.target.file.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      
      
    }, false);

    reader.onloadend = () =>{
      if ( image.current ) {
        image.current.src = reader.result as string;
      } 
      console.log(reader.result);
    }

    reader.readAsDataURL(file);
    
    
  }

  return (
    <main>
      <button onClick={handleAuthSignIn}>Sign In</button>
      <button onClick={handleAuthSignOut}>Sign Out</button>
      <button onClick={handleFetch}>Test</button>
      <form action="" onSubmit={handleFormSubmit}>
        <input type="file" name="file"/>
        <input type="text" name="username" placeholder="name"/>
        <input type="text" name="userbio" placeholder="userbio" />
        <img src="" alt=""  height={200} width ={200} ref={image}/>
        <button type="submit">submit</button>
      </form>
    </main>
  )
}

export default Home
