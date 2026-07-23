import React, { useMemo } from "react";
import SearchBar from "./SearchBar";
import StatusBadge from "./StatusBadge";

function PatientTable({
  patients,
  query,
  setQuery,
  filter,
  setFilter,
  onSelectPatient,
}) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients
      .filter((p) => {
        if (!q) return true;
        const hay =
          `${p.name} ${p.uHID} ${p.condition} ${p.phone}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((p) => {
        if (filter === "all") return true;
        return p.condition === filter;
      });
  }, [patients, query, filter]);

  const filterOptions = [
    "all",
    ...new Set(patients.map((p) => p.condition).filter(Boolean)),
  ];

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">Patient Management</h3>
          <p className="doctor-panel__subtitle">
            Search and manage patient records
          </p>
        </div>

        <div className="doctor-panel__actions">
          <div className="doctor-filter">
            <label className="doctor-filter__label">Filter</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="doctor-filter__select"
            >
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All Patients" : opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="doctor-panel__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name, UHID, condition, phone"
        />
      </div>

      <div className="doctor-table-wrap">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UHID</th>
              <th>Condition</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="doctor-table__empty">
                  No patients found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.uHID}>
                  <td>{p.name}</td>
                  <td>{p.uHID}</td>
                  <td>{p.condition}</td>
                  <td>{p.phone}</td>
                  <td>{p.lastVisit}</td>
                  <td>
                    <StatusBadge
                      variant={
                        p.status === "Pending"
                          ? "warning"
                          : p.status === "Critical"
                            ? "danger"
                            : "success"
                      }
                    >
                      {p.status}
                    </StatusBadge>
                  </td>
                  <td className="doctor-table__action">
                    <button
                      type="button"
                      className="doctor-btn doctor-btn--primary"
                      onClick={() => onSelectPatient(p)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTable;
