

export interface ToastNotificationProps {
  title: string,
  message: string,
  type: "FAILURE" | "SUCCESS"
}

export const ToastNotification = ( {title, message, type }: ToastNotificationProps) =>{

  return (
    <div className={`toast ${type==="SUCCESS"? "success":"failure"}`}>
      <p className="toast__title">{title}</p>
      <p className="toast__message">{message}</p>
      <div className="toast__icon-holder">
        <img className="toast__icon" 
          src={`/svgs/${type==="SUCCESS"? "check-mark-notif":"exclamation-mark-notif"}.svg`} 
          alt=""
          aria-hidden="true" />
      </div>
    </div>  
  );
}