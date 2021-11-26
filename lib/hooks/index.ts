import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../store";
import useSWR from "swr";
import { fetcher } from "../utils";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["getState"]>(); 

export const useCurrentUser = () =>{
  return useSWR("/api/user", fetcher);
}
