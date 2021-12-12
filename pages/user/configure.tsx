import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/react";
import { ReactElement, ReactNode, useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks";
import HTMLHead from "@/page-components/layout/head";
import { Configure } from "@/page-components/configure";
import { buildFetchedUpdate, fetcher } from "@/lib/utils";


type UserConfigure = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
}

const UserConfigurePage: UserConfigure = () =>{
  const { session, userProfile } = useCurrentUser();
  const router = useRouter();

  useEffect(() =>{
    if ( session && userProfile ) {
      if ( !userProfile.isDoneConfiguring) {
        const updateConfiguration = buildFetchedUpdate("PATCH", {isDoneConfiguring: false});
        fetcher("/api/user", updateConfiguration);
      } else {
        router.replace("/collabs");
      }
    }
  }, [ session, userProfile ])

  if ( userProfile && !userProfile.isDoneConfiguring && userProfile.githubId ) {
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