import React, { useState ,useEffect} from "react";
import "../../styles/Nurse/Dashboard.css";

export default function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalBeds, setTotalBeds] = useState(25);

  useEffect(() =>{
    const savedPatients = localStorage.getItem("recepionist-total-patients");
    if(savedPatients){
      setTotalPatients(Number(savedPatients));
      }

      const savedBeds = localStorage.getItem("total_beds_count");
      if(savedBeds){
        setTotalBeds(Number(savedBeds));
      }
    
  }, [])


  return (
    <div className="dashboardCards">

<div className="nurse-topbar">Nurse Panel</div>
      <div className="card blue">
        <h2>Total Patients</h2>
        <p>{totalPatients}</p>
      </div>

      {/* <div className="card red">
        <h2>Critical Patients</h2>
        <p>2</p>
      </div> */}

      <div className="card green">
        <h2>Total Beds</h2>
        <p>{totalBeds}</p>
      </div>

    </div>
  );
}