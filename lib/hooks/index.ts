import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AppState, AppStore } from "../store";
import { selectUser, setUser } from "@/lib/reducers/user.reducer";
import { fetcher } from "../utils";
import { testInputError } from "@/components/functionsUtilities.ts";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>(); 

export const useCurrentUser = () =>{
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

export type UseFormElement = {
  html: HTMLInputElement | HTMLTextAreaElement,
  errorMessageId: string,
  errorName: string,
  maxLength?: number
}

export const useForm = () =>{
  const liveRegion = useRef<HTMLParagraphElement | null>(null);
  const formElementsArray = useRef(Array<UseFormElement>());
  const [ isSuccess, setIsSuccess ] = useState(false);
  const errorMessages = Array<string>();

  const registerElement = (element: UseFormElement) =>{
    formElementsArray.current?.push(element);
  }

  const validateForm = () =>{
    const fieldElements: Record<string, HTMLInputElement | HTMLTextAreaElement> = {};
    let isFailed = false;

    if ( !formElementsArray.current.length ) return;
    
    formElementsArray.current.forEach((element)=>{
      if ( testInputError(element.html, element.errorMessageId, element.maxLength )) {
        errorMessages.push(element.errorName);
      }
      fieldElements[element.html.name] = element.html;
    })

    if ( errorMessages.length && liveRegion.current ) {
      isFailed = true;
      liveRegion.current.textContent = "Form submission invalid. Check your " + errorMessages.join(", ") + " input fields.";
    }

    return {
      isFailed,
      fieldElements
    }
  }

  return { 
    registerElement,
    liveRegion, 
    validateForm, 
    isSuccess,
    setIsSuccess
  };
};

export const useExpansion = () =>{
  const [ isExpanded, setIsExpanded ] = useState(false);

  const handleExpansion = () => setIsExpanded(prev => !prev);

  return {
    isExpanded,
    handleExpansion
  }
}