import React, { useEffect, useState } from "react";
import "../../styles/Lab/TestCatalog.css";

function TestCatalog() {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/lab/tests"
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
    <div>
      <h2>Test Catalog</h2>

      {loading ? (
        <p>Loading lab tests...</p>
      ) : labTests.length === 0 ? (
        <p>No Lab Tests Available</p>
      ) : (
        labTests.map((test) => (
          <div key={test._id}>
            <p>
              <strong>{test.testName}</strong>
            </p>

            <p>
              Department: {test.department || "Lab"}
            </p>

            <p>
              Category: {test.category || "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default TestCatalog;