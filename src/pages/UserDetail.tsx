import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import "./UserDetail.css";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((s) =>
    s.users.users.find((u) => u.id === Number(id))
  );

  if (!user)
    return (
      <div className="state-screen">
        <p>User not found.</p>
        <button className="btn-primary" onClick={() => navigate("/users")}>
          Back to directory
        </button>
      </div>
    );

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate("/users")}>
        ← Directory
      </button>

      <div className="detail-hero">
        <div className="detail-avatar">{user.name.charAt(0)}</div>
        <div className="detail-hero-info">
          <h2 className="detail-name">{user.name}</h2>
          <p className="detail-company">{user.company?.name ?? "—"}</p>
        </div>
        <span className="detail-id-badge">ID #{user.id}</span>
      </div>

      <div className="detail-section">
        <p className="detail-section-label">Contact</p>
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-field-label">Email</span>
            <span className="detail-field-value">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Phone</span>
            <span className="detail-field-value">{user.phone || "—"}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Website</span>
            <span className="detail-field-value">
              {user.website ? <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a> : "—"}
            </span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Company</span>
            <span className="detail-field-value">{user.company?.name ?? "—"}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <p className="detail-section-label">Address</p>
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-field-label">Street</span>
            <span className="detail-field-value">{user.address.street}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Suite</span>
            <span className="detail-field-value">{user.address.suite || "—"}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">City</span>
            <span className="detail-field-value">{user.address.city}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Zipcode</span>
            <span className="detail-field-value">{user.address.zipcode}</span>
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button className="btn-primary" onClick={() => navigate(`/edit-user/${user.id}`)}>
          Edit User
        </button>
        <button className="btn-secondary" onClick={() => navigate("/users")}>
          Back
        </button>
      </div>
    </div>
  );
}
