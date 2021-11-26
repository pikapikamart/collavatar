import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { useSession, getSession } from "next-auth/react";
import { fetcher } from "@/lib/utils";
import { fetchAllCollavatarProjects } from "@/lib/reducers/collab.reducer";


const Collab: NextPage = () =>{
  

  return (
    <div>Hello</div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async(context) =>{
  
  // const session = await getSession(context);
  // if ( session ) {
  //   // fetch the projects
  //   // but not fetch user, leave it to client side so no crawler

  // }
  await store.dispatch(fetchAllCollavatarProjects);

  return {
    props: {
      
    }
  }
})

export default Collab;