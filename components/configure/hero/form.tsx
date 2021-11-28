import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, CollavatarUser } from "@/lib/reducers/user.reducer";
import { ProfilePicture } from "./profilePicture";
import { InputField } from "@/components/utilities/inputField";
import { TextAreaField } from "@/components/utilities/textareField";


export const HeroForm = () =>{
  const userProfile: CollavatarUser = useAppSelector(selectUser);
  const [ userPicture, setUserPicture ] = useState("");

  const bioSpan = <span>(200 characters maximum)</span>

  return (
    <form className="configure__form">
      <h1 className="configure__title">Configure your profile information</h1>
      <ProfilePicture name={userProfile.username} 
        src={userPicture? userPicture : userProfile.userImage}
        setUserPicture={setUserPicture} />
      <InputField name="profileName" labelTag="Profile name" value={userProfile.username} />
      <TextAreaField name="profileBio" labelTag="Add a bio." span={bioSpan} />
    </form>
  );
}

