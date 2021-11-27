import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { AppState, AppStore } from "../store";
import { fetcher } from "../utils";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>(); 

export function useCurrentUser<Type>() {
  const { data, error } = useSWR("/api/user", fetcher);

  return {
    data: data as Type,
    error,
    isLoading: !error && !data
  }
}
