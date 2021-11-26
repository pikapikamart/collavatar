import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../store";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["getState"]>(); 

export const useCurrentUser = async() =>{
  const [ isUser, setIsUser ] = useState()
  const { data: session } = useSession();
}