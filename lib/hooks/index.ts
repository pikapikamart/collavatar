import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../store";
import useSWR from "swr";
import { fetcher } from "../utils";
import { CollavatarUser } from "@/lib/reducers/user.reducer";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>(); 

export const useCurrentUser = () =>{
  // return useSWR("/api/user", fetcher);
  const { data, error } = useSWR("/api/user", fetcher);

  return {
    data: data as CollavatarUser,
    error,
    isLoading: !error && !data
  }
}
