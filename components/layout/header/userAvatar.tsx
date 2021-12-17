import { useExpansion, useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/reducers/user.reducer";


export const UserAvatar = () => {
  const { isExpanded, handleExpansion } = useExpansion();
  const userProfile = useAppSelector(selectUser);

  return (
    <div className="user">
      <button className="user__button btn__header"
        onClick={handleExpansion}
        aria-expanded={isExpanded}>
        <span className="visually-hidden">User option dropdown</span>
        <img className="user__image" 
          src={userProfile.userImage} 
          alt={userProfile.username}  />
      </button>
    </div>
  );
}