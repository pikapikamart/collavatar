import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "@/lib/store";
import { fetchAllCollavatarProjects } from "@/lib/reducers/projects.reducer";
import { useAppDispatch, useCurrentUser } from "@/lib/hooks";
import { useRouter } from "next/dist/client/router";
import { CollavatarUser, setUser } from "@/lib/reducers/user.reducer";


const Collab: NextPage = (props) =>{
  const router = useRouter();
  // const userData: CollavatarUser = useCurrentUser().data;
  const { data, error, isLoading } = useCurrentUser();
  const dispatch = useAppDispatch();

  if ( data && data.isDoneConfiguring==="false") {
    dispatch(setUser(data));
    router.replace("/api/configure");
  }

  if ( isLoading ) return <div>Spinner</div>;

  return (
    <div>
      collab
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async({ req, res }) =>{
  store.dispatch(fetchAllCollavatarProjects);

  return {
    props: {}
  }
})

export default Collab;