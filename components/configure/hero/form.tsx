import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, CollavatarUser } from "@/lib/reducers/user.reducer";
import { ProfilePicture } from "./profilePicture";


export const HeroForm = () =>{
  const userProfile: CollavatarUser = useAppSelector(selectUser);
  const [ userPicture, setUserPicture ] = useState("");

  return (
    <form className="configure__form">
      <h1 className="configure__title">Configure your profile information</h1>
      <ProfilePicture name={userProfile.username} 
        src={userPicture? userPicture : userProfile.userImage}
        setUserPicture={setUserPicture} />
    </form>
  );
}

