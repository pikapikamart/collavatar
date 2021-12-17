import { SiteLogo } from "./siteLogo";
import { CurrentPath } from "./currentPath";
import { Notification } from "./notification";
import { UserAvatar } from "./userAvatar";


const Header = () =>{

  return (
    <header className="header">
      <div className="header__block">
        <SiteLogo />
        <CurrentPath />
      </div>
      <div className="header__block">
        <Notification />
        <UserAvatar />
      </div>
    </header>
  );
}

export default Header;