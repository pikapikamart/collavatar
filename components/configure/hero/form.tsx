import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAppSelector, useForm } from "@/lib/hooks";
import { selectUser, CollavatarUser } from "@/lib/reducers/user.reducer";
import { ProfilePicture } from "./profilePicture";
import { InputField } from "@/components/utilities/inputField";
import { TextAreaField } from "@/components/utilities/textareField";
import { SubmitButton } from "@/components/utilities/button";
import { buildFetchedUpdate, fetcher } from "@/lib/utils";
import { ToastNotificationProps, ToastNotification } from "@/components/utilities/toastNotification";


interface FormTarget {
  profileName: HTMLInputElement,
  profileBio: HTMLTextAreaElement
}

export const HeroForm = () =>{
  const userProfile: CollavatarUser = useAppSelector(selectUser);
  const [ userPicture, setUserPicture ] = useState("");
  const [ toastData, setToastData ] = useState<ToastNotificationProps | null>(null);
  const [ updateInformation, setUpdateInformation ] = useState<ReturnType<typeof buildFetchedUpdate> | null>(null);
  const { 
    registerElement, 
    liveRegion, 
    validateForm,
    isSuccess,
    setIsSuccess } = useForm();
  const router = useRouter();

  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const validationResult = validateForm();

    if ( validationResult && !validationResult.isFailed ) {
      const { profileName, profileBio } = (validationResult.fieldElements as unknown) as FormTarget;
      const userUpdateProfile = {
        username: profileName.value,
        userBio: profileBio.value,
        userImage: userPicture
      }
      setUpdateInformation(buildFetchedUpdate("PATCH", userUpdateProfile));
    }
  }

  useEffect(() =>{
    if ( updateInformation ) {
      const sendInformation = async() =>{
        const fetchResult = await fetcher("/api/user", updateInformation);
        
        if ( "data" in fetchResult ) {
          setToastData({
            title: "Success.",
            message: fetchResult.message,
            type: "SUCCESS"
          });
          liveRegion.current!.textContent = "Form submission success";
          setIsSuccess(true);
        } 
        if ( "error" in fetchResult) {
          setToastData({
            title: fetchResult.title,
            message: fetchResult.error,
            type: "FAILURE"
          })
          liveRegion.current!.textContent = fetchResult.error;
        }

        const notificationTimeout = setTimeout(() => {
          setToastData(null);
        }, 7000);
      
        return () => clearTimeout(notificationTimeout);
      }
      sendInformation();
      setUpdateInformation(null);
      // could return timeout
    }
  }, [ updateInformation ]);

  useEffect(() =>{
    if ( isSuccess ) {
      const timeout = setTimeout(() =>{
        setIsSuccess(false);
        router.replace("/collabs")
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [ isSuccess ]);


  const bioSpan = <span>(200 characters maximum)</span>;

  return (
    <>
      { toastData && (
        <ToastNotification {...toastData} />
      )}
      <form className="configure__form"
        onSubmit={handleFormSubmit}>
        <h1 className="configure__title">Configure your profile information</h1>
        <p className="visually-hidden" 
          ref={liveRegion}
          aria-live="polite"></p>
        <ProfilePicture name={userProfile.username} 
          src={userPicture? userPicture : userProfile.userImage}
          setUserPicture={setUserPicture} />
        <InputField name="profileName" 
          labelTag="Profile name" 
          value={userProfile.username}
          register={registerElement}>
            <p className="input__error" 
              id="profileNameError">
              enter a profile name</p>
        </InputField>
        <TextAreaField name="profileBio" 
          labelTag="Add a bio." 
          maxLength={200}
          span={bioSpan}
          register={registerElement} >
            <p className="textarea__error" 
              id="profileBioError">
              bio exceeds maximum characters</p>
        </TextAreaField>
        <SubmitButton type="submit" 
          text="Start Collaborating" />
      </form>
    </>
  );
}

