import { useRouter } from "next/dist/client/router";
import { checkCurrentLink } from "./current";
import Link from "next/dist/client/link";


export const LogoCurrent = () =>{
  const currentLink = useRouter().pathname;
  const { name, text } = checkCurrentLink(currentLink); 

  return (
    <div className="header__block">
      <div className="header__logo-wrapper">
        <Link href="/collabs">
          <a className="header__logo-link">
            <span className="visually-hidden">collabs</span>
            <picture>
              <source media="(min-width: 800px)" srcSet="/svgs/logo/logo-desktop.svg" />
              <img src="/svgs/logo/logo-mobile.svg" 
                alt="collavatar"  />
            </picture>
          </a>
        </Link>
      </div>
      <div className="header__current">
        <h2 className="header__current-title">{name}</h2>
        <p className="header__current-text">{text}</p>
      </div>
    </div>
  );
}