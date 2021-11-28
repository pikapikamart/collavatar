import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useSession, getSession } from "next-auth/react";
import { ReactElement, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector, useCurrentUser } from "@/lib/hooks";
import { CollavatarUser, selectUser, thunkSetUser } from "@/lib/reducers/user.reducer";
import HTMLHead from "@/page-components/layout/head";
import { Configure } from "@/page-components/configure";


type UserConfigure = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
}

export interface Configuration extends CollavatarUser {
  isDoneConfiguring: boolean
}

const UserConfigurePage: UserConfigure = () =>{
  const { data: session } = useSession();
  const { data } = useCurrentUser<Configuration>();
  const userProfile = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() =>{
    if ( session && data ) {
      if ( !data.isDoneConfiguring ) {
        // set to true after finishing the layout
        dispatch(thunkSetUser({...data, isDoneConfiguring: false}))
      } else {
        // router.replace("/collabs")
      }
    }
  }, [ data ])

  if ( data && !data.isDoneConfiguring && userProfile.githubId ) {
    return (
      <Configure />
    )
  }
  
  return (
    <div>
      Spinner
    </div>
  )
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