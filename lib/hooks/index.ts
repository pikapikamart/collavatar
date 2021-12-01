import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { AppState, AppStore } from "../store";
import { fetcher } from "../utils";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>(); 

export function useCurrentUser<Type>(option: "fetch" | "swr") {
  // const { data, error } = useSWR("/api/user", fetcher);
  let data;
  let error;
  if ( option === "fetch") {
    data = fetcher("/api/user");
  } else{
    const { data: userData, error: userError } = useSWR("/api/user", fetcher);
    data = userData;
    error = userError;
  }

  return {
    data: data as Type,
    error,
    isLoading: !error && !data
  }
}
