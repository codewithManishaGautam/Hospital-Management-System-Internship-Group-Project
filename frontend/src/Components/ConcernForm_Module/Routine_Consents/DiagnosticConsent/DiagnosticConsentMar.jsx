import React from "react";

const DiagnosticConsentMarathi = () => {
  return (
    <div className="container border p-4">
      <h4 className="text-center fw-bold">
        निदानात्मक तपासणी व वैद्यकीय माहिती प्रसिद्ध करण्यासाठी संमतीपत्र
      </h4>

      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <td>रुग्णाचे नाव</td>
            <td></td>
          </tr>

          <tr>
            <td>तपासणीचे नाव</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>
        वैद्यकीय निदानासाठी करण्यात येणाऱ्या तपासण्या काही प्रमाणात धोकादायक
        व त्रासदायक असू शकतात.
      </p>

      <p>
        मला आवश्यक असलेल्या तपासणीविषयी आणि त्यातील संभाव्य धोक्यांविषयी
        संपूर्ण माहिती देण्यात आलेली आहे.
      </p>

      <p>
        मी सदर तपासणीस संमती देत असून माझे वैद्यकीय रेकॉर्ड आवश्यकतेनुसार
        वापरण्यास डॉक्टरांना व रुग्णालय प्रशासनाला परवानगी देत आहे.
      </p>

      <div className="row mt-5">
        <div className="col-4">
          रुग्ण सही
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>

        <div className="col-4">
          दुभाषी सही
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>

        <div className="col-4">
          डॉक्टर सही
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticConsentMarathi;