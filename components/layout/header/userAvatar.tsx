import { CollavatarUser } from "@/lib/reducers/user.reducer";
import { useExpansion, useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/reducers/user.reducer";


interface UserAvatar {
  user: CollavatarUser
}

export const UserAvatar = ({ user }: UserAvatar) => {
  const { isExpanded, handleExpansion } = useExpansion();

  return (
    <div className="user">
      <button className="user__button btn__header"
        onClick={handleExpansion}
        aria-expanded={isExpanded}>
        <span className="visually-hidden">User option dropdown</span>
        <img className="user__image" 
          src={user.userImage} 
          alt={user.username}  />
      </button>
    </div>
  );
}