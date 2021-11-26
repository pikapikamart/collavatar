import { NextPage } from "next";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/reducers/user.reducer";
import { ReactElement, ReactNode } from "react";
import HTMLHead from "@/page-components/layout/head";


type UserConfigure = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
}

const UserConfigurePage: UserConfigure = () =>{
  const user = useAppSelector(selectUser);
  
  if ( user ) {
    return (
      <div>{JSON.stringify(user)}</div>  
    );
  }

  return (
    <div>
      No User. Sign in to configure.
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