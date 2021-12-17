import { useExpansion } from "@/lib/hooks";


export const Notification = () =>{
  const { isExpanded, handleExpansion} = useExpansion();

  return (
    <div className="notification">
      <button className="notification__button btn__header"
        aria-expanded={isExpanded}
        onClick={handleExpansion}>
        <span className="visually-hidden">Notifications</span>
        <img className="notification__icon" 
          src="/svgs/notification.svg" 
          alt=""
          aria-hidden="true" />
      </button>
    </div>
  )
}