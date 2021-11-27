import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { useAppDispatch, useAppSelector, useCurrentUser } from "@/lib/hooks";
import { selectUser, thunkSetUser } from "@/lib/reducers/user.reducer";
import HTMLHead from "@/page-components/layout/head";
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";


type UserConfigure = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
}

const UserConfigurePage: UserConfigure = () =>{
  const { data: session } = useSession();
  const { data, error, isLoading } = useCurrentUser();
  const dispatch = useAppDispatch();
  if ( session ) {
    if ( data && !data.isDoneConfiguring) {
      dispatch(thunkSetUser({isDoneConfiguring: true}))
    } if ( data && data.isDoneConfiguring ) {

    }
    // return a component
  }
  // replace
  return <div>1</div>
}

UserConfigurePage.getLayout = function getLayout(page: ReactElement) {

  return (
    <>
      <HTMLHead />
      {page}
    </>
  );
}

export default UserConfigurePage;

export const getServerSideProps: GetServerSideProps = async(context) =>{

  return {
    props: {
      session: await getSession(context)
    }
  }
}