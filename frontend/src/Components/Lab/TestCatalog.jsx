import React, { useEffect, useState } from "react";
import "../../styles/Lab/TestCatalog.css";

function TestCatalog() {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const response = await fetch(
          "https://hospital-management-system-internship-rtob.onrender.com/lab/tests"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch lab tests");
        }

        const data = await response.json();

        setLabTests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Test Catalog Error:", error);
        setLabTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  return (
    <div className="test-catalog">
      <h2>Test Catalog</h2>

      {loading ? (
        <p className="test-catalog__message">
          Loading lab tests...
        </p>
      ) : labTests.length === 0 ? (
        <p className="test-catalog__message">
          No Lab Tests Available
        </p>
      ) : (
        <div className="test-catalog__list">
          {labTests.map((test) => (
            <div
              key={test._id}
              className="test-catalog__card"
            >
              <p className="test-catalog__name">
                <strong>{test.testName}</strong>
              </p>

              <p>
                Department: {test.department || "Lab"}
              </p>

              <p>
                Category: {test.category || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestCatalog;
