import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppState, AppStore } from "../store";
import { selectUser, setUser } from "@/lib/reducers/user.reducer";
import { fetcher } from "../utils";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>(); 

export function useCurrentUser() {
  const { data: session } = useSession();
  const userProfile = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() =>{
  //  only dispatch when there is no current user 
    if ( session && !userProfile.githubId ) {
      const getUser = async () =>{
        const fetchedUserData = await fetcher("/api/user");
        
        if ( "data" in fetchedUserData ) {
         dispatch(setUser(fetchedUserData.data));
        }
     }

     getUser();
   }
 }, [ session ])

 return {
   session,
   userProfile: userProfile.githubId? userProfile : null
  }
}
