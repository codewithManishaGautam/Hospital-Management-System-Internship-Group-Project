import React from "react";
import "../../styles/Nurse/DailyReports.css";

export default function DailyReports({
  newReport,
  setNewReport,
  saveDailyReport
}) {
  return (
    <div className="dailyReport">

      <h2>Daily Nursing Report</h2>

      <div className="reportGrid">

        <input
          placeholder="BP"
          value={newReport.bp}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              bp: e.target.value
            })
          }
        />

        <input
          placeholder="Pulse"
          value={newReport.pulse}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              pulse: e.target.value
            })
          }
        />

        <input
          placeholder="Temperature"
          value={newReport.temp}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              temp: e.target.value
            })
          }
        />

        <input
          placeholder="SpO2"
          value={newReport.spo2}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              spo2: e.target.value
            })
          }
        />

        <input
          placeholder="Sugar"
          value={newReport.sugar}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              sugar: e.target.value
            })
          }
        />

        <input
          placeholder="Intake"
          value={newReport.intake}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              intake: e.target.value
            })
          }
        />

        <input
          placeholder="Output"
          value={newReport.output}
          onChange={(e) =>
            setNewReport({
              ...newReport,
              output: e.target.value
            })
          }
        />

      </div>

      <textarea
        placeholder="Nursing Notes"
        value={newReport.notes}
        onChange={(e) =>
          setNewReport({
            ...newReport,
            notes: e.target.value
          })
        }
      />

      <button
        className="saveBtn"
        onClick={saveDailyReport}
      >
        Save Daily Report
      </button>

    </div>
  );
}