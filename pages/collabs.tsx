import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { useSession, getSession } from "next-auth/react";
import { fetcher } from "@/lib/utils";
import { fetchAllCollavatarProjects } from "@/lib/reducers/collab.reducer";


const Collab: NextPage = (props) =>{

  return (
    <div>Hello</div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async({ req }) =>{
  
  // const session = await getSession(context);
  // if ( session ) {
  //   // fetch the projects
  //   // but not fetch user, leave it to client side so no crawler
  // }
  const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  // fetch user in here
  // const currentUser = await fetcher(`${baseUrl}/api/user`);
  const test = await fetch(`${baseUrl}/api/user`);
  // console.log(test);
  // const testUser = await test.json();

  // console.log(currentUser);
  await store.dispatch(fetchAllCollavatarProjects);

  return {
    props: {
      // user: JSON.stringify(currentUser)
    }
  }
})

export default Collab;