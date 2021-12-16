import { useState } from "react";


export const NotifUser = () =>{
  const [ notifExpanded, setNotifExpanded ] = useState(false);

  const handleNotifExpansion = () => setNotifExpanded(prev => !prev); 

  return (
    <div className="header__block">
      <div className="notification">
        <button className="notification__button"
          aria-expanded={notifExpanded}
          onClick={handleNotifExpansion}>
          <span className="visually-hidden">Notifications</span>
          <img className="notification__icon" 
            src="/svgs/logo/notification.svg" 
            alt=""
            aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}