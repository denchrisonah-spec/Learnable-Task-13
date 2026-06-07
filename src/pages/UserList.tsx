import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import UserCard from "../components/UserCard";
import "./UserList.css";

export default function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useAppSelector((s) => s.users);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, users.length]);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.address.city.toLowerCase().includes(query.toLowerCase())
  );

  const cities = new Set(users.map((u) => u.address.city)).size;

  if (loading)
    return (
      <div className="state-screen">
        <div className="spinner" />
        <p className="loading-text">Fetching directory…</p>
      </div>
    );

  if (error)
    return (
      <div className="state-screen error">
        <p>⚠ {error}</p>
      </div>
    );

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">People</p>
          <h1 className="page-title">User Directory</h1>
          <p className="page-sub">{users.length} members across the organization</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/add-user")}>
          + Add User
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card" style={{ animationDelay: "0.05s" }}>
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-card" style={{ animationDelay: "0.1s" }}>
          <div className="stat-value">{cities}</div>
          <div className="stat-label">Cities</div>
        </div>
        <div className="stat-card" style={{ animationDelay: "0.15s" }}>
          <div className="stat-value">{filtered.length}</div>
          <div className="stat-label">Showing</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          placeholder="Search by name, email or city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="user-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <p>No users match your search.</p>
          </div>
        ) : (
          filtered.map((u, i) => (
            <div key={u.id} style={{ animationDelay: `${i * 0.03}s` }}>
              <UserCard user={u} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
