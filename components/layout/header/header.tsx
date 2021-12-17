import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/reducers/user.reducer";
import { SiteLogo } from "./siteLogo";
import { CurrentPath } from "./currentPath";
import { GreetUser } from "./greetUser";
import { Notification } from "./notification";
import { UserAvatar } from "./userAvatar";


const Header = () =>{
  const userProfile = useAppSelector(selectUser);

  return (
    <header className="header">
      <div className="header__block">
        <SiteLogo />
        <CurrentPath />
      </div>
      <div className="header__block">
        <GreetUser user={userProfile} />
        <Notification />
        <UserAvatar user={userProfile} />
      </div>
    </header>
  );
}

export default Header;