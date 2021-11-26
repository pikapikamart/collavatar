import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { useSession, getSession } from "next-auth/react";


const Collab: NextPage = () =>{
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>Hello</div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async(context) =>{
  
  const session = await getSession(context);
  if ( session ) {
    // fetch the projects
    // but not fetch user, leave it to client side so no crawler

  }

  return {
    props: {
      session
    }
  }
})

export default Collab;