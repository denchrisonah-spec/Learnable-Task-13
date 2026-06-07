import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, updateUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { User } from "../types";
import "./UserForm.css";

const empty = {
  name: "", email: "", phone: "", website: "",
  address: { street: "", suite: "", city: "", zipcode: "" },
  company: { name: "" },
};

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const existing = useAppSelector((s) =>
    s.users.users.find((u) => u.id === Number(id))
  );

  const [form, setForm] = useState(empty);
  const [touched, setTouched] = useState({ name: false, email: false });

  useEffect(() => {
    if (isEdit && existing) {
      setForm({
        name: existing.name,
        email: existing.email,
        phone: existing.phone,
        website: existing.website,
        address: { ...existing.address },
        company: { name: existing.company?.name ?? "" },
      });
    }
  }, [isEdit, existing]);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setAddr = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const nameErr = touched.name && !form.name.trim();
  const emailErr = touched.email && !form.email.trim();

  function handleSubmit() {
    setTouched({ name: true, email: true });
    if (!form.name.trim() || !form.email.trim()) return;

    if (isEdit && existing) {
      dispatch(updateUser({ ...form, id: existing.id } as User));
      navigate(`/users/${existing.id}`);
    } else {
      dispatch(addUser(form as Omit<User, "id">));
      navigate("/users");
    }
  }

  return (
    <div className="form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="form-header">
        <p className="form-eyebrow">{isEdit ? "Editing" : "New Member"}</p>
        <h2 className="form-title">{isEdit ? `Edit ${existing?.name ?? "User"}` : "Add User"}</h2>
      </div>

      <div className="form-section">
        <h4 className="section-label">Personal Info</h4>
        <div className="form-row">
          <Field label="Full Name *" value={form.name} onChange={(v) => set("name", v)}
            onBlur={() => setTouched((p) => ({ ...p, name: true }))} error={nameErr} />
          <Field label="Email *" value={form.email} onChange={(v) => set("email", v)}
            type="email" onBlur={() => setTouched((p) => ({ ...p, email: true }))} error={emailErr} />
        </div>
        <div className="form-row">
          <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
          <Field label="Website" value={form.website} onChange={(v) => set("website", v)} />
        </div>
        <Field label="Company" value={form.company.name}
          onChange={(v) => setForm((p) => ({ ...p, company: { name: v } }))} />
      </div>

      <div className="form-section">
        <h4 className="section-label">Address</h4>
        <div className="form-row">
          <Field label="Street" value={form.address.street} onChange={(v) => setAddr("street", v)} />
          <Field label="Suite / Apt" value={form.address.suite} onChange={(v) => setAddr("suite", v)} />
        </div>
        <div className="form-row">
          <Field label="City" value={form.address.city} onChange={(v) => setAddr("city", v)} />
          <Field label="Zipcode" value={form.address.zipcode} onChange={(v) => setAddr("zipcode", v)} />
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
        <button className="btn-primary" onClick={handleSubmit}>
          {isEdit ? "Save Changes" : "Create User"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", onBlur, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; onBlur?: () => void; error?: boolean;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        className={`field-input${error ? " error" : ""}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={label.replace(" *", "")}
      />
    </label>
  );
}
