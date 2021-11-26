import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { fetchAllCollavatarProjects } from "@/lib/reducers/projects.reducer";
import { useCurrentUser } from "@/lib/hooks";


const Collab: NextPage = (props) =>{
  const { data, error } = useCurrentUser();
  
  
  return (
    <div>Hello</div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async({ req, res }) =>{
  store.dispatch(fetchAllCollavatarProjects);

  return {
    props: {}
  }
})

export default Collab;