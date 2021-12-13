import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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

type UseFormElement = {
  element: HTMLInputElement | HTMLTextAreaElement,
  error: string,
  errorName: string,
  maxLength?: number
}

export const useForm = () =>{
  const liveRegion = useRef<HTMLParagraphElement | null>(null);
  const formElementsArray = useRef(Array<UseFormElement>())
  const errorMessages = Array<string>();

  const registerElement = (element: UseFormElement) =>{
    formElementsArray.current?.push(element);
  }

  const validateForm = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    // map through the formElementsArray and check dynamically
    if ( !formElementsArray.current.length ) return;

    formElementsArray.current.map((element: UseFormElement, index)=>{
      if ( element.element instanceof HTMLInputElement ) {
        if ( testInputError(element.element, element.error )) {
          errorMessages.push(element.errorName);
        }
      }
      if ( element.element instanceof HTMLTextAreaElement ) {
        if ( testInputError(element.element, element.error, element.maxLength )) {
          errorMessages.push(element.errorName);
        }
      }
    })

    if ( errorMessages.length && liveRegion.current ) {
      liveRegion.current.textContent = "Form submission invalid. Check your " + errorMessages.join(", ") + " input fields.";
    }
  }

  return { registerElement, liveRegion, validateForm };
};