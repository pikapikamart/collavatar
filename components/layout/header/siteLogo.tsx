import Link from "next/link";


export const SiteLogo = () =>{

  return (
    <div className="header__logo-wrapper">
      <Link href="/collabs">
        <a className="header__logo-link">
          <span className="visually-hidden">collabs</span>
          <picture>
            <source media="(min-width: 900px)" srcSet="/svgs/logo/logo-desktop.svg" />
            <img src="/svgs/logo/logo-mobile.svg" 
              alt="collavatar"  />
          </picture>
        </a>
      </Link>
    </div>
  );
}