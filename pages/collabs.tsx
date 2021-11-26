import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { useSession, getSession } from "next-auth/react";
import { fetchAllCollavatarProjects } from "@/lib/reducers/projects.reducer";


const Collab: NextPage = (props) =>{
  
  return (
    <div>Hello</div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async({ req, res }) =>{


  await store.dispatch(fetchAllCollavatarProjects);

  return {
    props: {
      // user: JSON.stringify(currentUser)
    }
  }
})

export default Collab;