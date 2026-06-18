import React from "react";
import Table_Form from "../../Table_Form";
import SignaturePad from "../../SignaturePad";

function TransferDiagnosticMar() {
  return (
    <div className="container">
      <Table_Form />

      <h4
        className="text-center fw-bold my-4"
        style={{ textTransform: "uppercase" }}
      >
        रोगनिदानासाठी हस्तांतरण संमतीपत्र
      </h4>

      <p style={{ textAlign: "justify", lineHeight: "2" }}>
        मी असे नमूद करतो / करते की माझ्या सद्य वैद्यकीय स्थितीबद्दलची पूर्ण
        माहिती मला दिली असून रोगनिदानासाठी मला डॉ.&nbsp;
        <SignaturePad width={220} height={35} design="line" />
        &nbsp;यांच्याकडे&nbsp;
        <SignaturePad width={300} height={35} design="line" />
        &nbsp;या कारणाकरिता जावे लागणार आहे.
      </p>

      <p style={{ textAlign: "justify", lineHeight: "2" }}>
        या निदानासाठी मला / माझ्या रुग्णाला तेथे नेण्यासाठी व तेथून आणण्यासाठी
        असलेले धोके आणि निदानासाठी न नेल्यास होणाऱ्या संभाव्य परिणामांची माहिती
        मला दिलेली आहे.
      </p>

      <p style={{ textAlign: "justify", lineHeight: "2" }}>
        हे सर्व जाणून घेऊन रुग्णाला निदानासाठी पाठविण्यासाठी व तेथून परत
        आणण्यासाठी मी संमती देत आहे.
      </p>

      <div className="mt-5">
        <div className="mb-4">
          <label className="fw-bold">रुग्णाचे / नातेवाईकाचे नाव :</label>

          <SignaturePad width={350} height={35} design="line" />
        </div>

        <div className="mb-4">
          <label className="fw-bold">रुग्णाशी नाते :</label>

          <SignaturePad width={350} height={35} design="line" />
        </div>

        <div className="mb-4">
          <label className="fw-bold">सही :</label>

          <SignaturePad width={220} height={80} design="border" />
        </div>
      </div>
    </div>
  );
}

export default TransferDiagnosticMar;
