import { useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, CollavatarUser } from "@/lib/reducers/user.reducer";
import { ProfilePicture } from "./profilePicture";
import { InputField } from "@/components/utilities/inputField";
import { TextAreaField } from "@/components/utilities/textareField";
import { SubmitButton } from "@/components/utilities/button";
import { testInputError } from "@/components/functionsUtilities.ts";


type FormTarget = Element & {
  profileName: HTMLInputElement,
  profileBio: HTMLTextAreaElement
}

export const HeroForm = () =>{
  const userProfile: CollavatarUser = useAppSelector(selectUser);
  const [ userPicture, setUserPicture ] = useState("");
  const liveRegion = useRef<HTMLParagraphElement | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const errorMessages = Array<string>();
    const target = event.target as FormTarget;
    const { profileName, profileBio } = target;
    
    if ( testInputError(profileName, "profileNameError")) {
      errorMessages.push("profile name");
    }
    if ( testInputError(profileBio, "profileBioError", 200)) {
      errorMessages.push("profile bio");
    }

    if ( errorMessages.length ) {
      liveRegion.current!.textContent = "Form submission invalid. Check your, " + errorMessages.join(", ") + " input fields";
    } else {
      // liveRegion.current!.textContent = "Form submission succes"
    }
  }

  const bioSpan = <span>(200 characters maximum)</span>;

  return (
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
        value={userProfile.username}>
          <p className="input__error" 
            id="profileNameError">
              enter a profile name
          </p>
      </InputField>
      <TextAreaField name="profileBio" 
        labelTag="Add a bio." 
        maxLength={200}
        span={bioSpan} >
          <p className="textarea__error"
            id="profileBioError">
              bio exceeds maximum characters
          </p>
      </TextAreaField>
      <SubmitButton type="submit"
        text="Start Collaborating" />
    </form>
  );
}

