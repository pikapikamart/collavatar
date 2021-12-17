import { CollavatarUser } from "@/lib/reducers/user.reducer";


interface GreetUser {
  user: CollavatarUser
}

export const GreetUser = ({ user }: GreetUser) =>{

  const checkTime = () =>{
    const currentHours = new Date().getHours();
    let greet = "";

    if ( currentHours < 12 ) {
      greet = "Good morning"
    } else if ( currentHours < 18 ) {
      greet = "Good afternoon"
    } else {
      greet = "Good evening"
    }

    return greet;
  }

  return (
    <div className="header__greet">
      <p className="header__greet-time">
        {checkTime()}
        <span className="header__greet-username"> {user.username}!</span>
      </p>
    </div>
  );
}