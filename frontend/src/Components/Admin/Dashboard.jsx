function Dashboard({ dashboard }) {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome Administrator</h2>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Doctors</h3>
          <p>{dashboard.totalDoctors}</p>
        </div>

        <div className="stats-card">
          <h3>Total Staff</h3>
          <p>{dashboard.totalStaff}</p>
        </div>

        <div className="stats-card">
          <h3>Total Patients</h3>
          <p>{dashboard.totalPatients}</p>
        </div>

        <div className="stats-card">
          <h3>Admitted Patients</h3>
          <p>{dashboard.admittedPatients}</p>
        </div>

        <div className="stats-card">
          <h3>Discharged Patients</h3>
          <p>{dashboard.dischargedPatients}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
