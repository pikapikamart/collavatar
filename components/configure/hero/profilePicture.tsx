import { Dispatch, SetStateAction, useRef } from "react";


interface ProfilePictureProps {
  name: string,
  src: string,
  setUserPicture: Dispatch<SetStateAction<string>>
}

export const ProfilePicture = ({ name, src, setUserPicture}: ProfilePictureProps) =>{
  const input = useRef<HTMLInputElement | null>(null);

  const handleFocusToInput = () => {
    input.current?.click();
  }

  const handleImageChange = () =>{
    const fileImage = input.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () =>{
      setUserPicture(reader.result as string);
    }

    if ( fileImage ) {
      reader.readAsDataURL(fileImage);
    }
  }

  return (
    <div>
      <div className="configure__avatar-holder">
        <img className="configure__avatar" 
          src={src} 
          alt={name} />  
      </div>
      <input type="file" 
        name="avatar" 
        id="avatar" 
        ref={input}
        hidden
        onChange={handleImageChange} />
      <button className="configure__avatar-button" 
        type="button"
        onClick={handleFocusToInput}>Choose other photo</button>
    </div>
  )
}