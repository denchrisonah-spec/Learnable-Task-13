import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { deleteUser } from "../store/userSlice";
import type { User } from "../types";
import "./UserCard.css";

interface Props { user: User; }

export default function UserCard({ user }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-avatar">{user.name.charAt(0)}</div>

      <div className="card-body">
        <h3 className="card-name">{user.name}</h3>
        <p className="card-email">{user.email}</p>
        <div className="card-meta">
          <span className="card-city">{user.address.city}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-view" onClick={() => navigate(`/users/${user.id}`)}>View</button>
        <button className="btn-edit" onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
        <button className="btn-delete" onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
      </div>
    </div>
  );
}
