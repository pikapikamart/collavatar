import { useRouter } from "next/dist/client/router";
import { checkCurrentLink } from "./current";


export const CurrentPath = () =>{
  const currentLink = useRouter().pathname;
  const { name, text } = checkCurrentLink(currentLink); 

  return (
    <div className="header__current">
      <h2 className="header__current-title">{name}</h2>
      <p className="header__current-text">{text}</p>
    </div>
  );
}