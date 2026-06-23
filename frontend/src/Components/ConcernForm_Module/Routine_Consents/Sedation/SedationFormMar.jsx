import React from "react";

const SedationFormMarathi = () => {
  return (
    <div className="container border p-4">
      <h4 className="text-center fw-bold">
        प्रक्रियेदरम्यान भूल / सेडेशन देण्यासाठी संमतीपत्र
      </h4>

      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <td>रुग्णाचे नाव</td>
            <td></td>
            <td>लिंग / वय</td>
            <td></td>
          </tr>

          <tr>
            <td>निदान</td>
            <td colSpan="3"></td>
          </tr>

          <tr>
            <td>प्रक्रियेचे नाव</td>
            <td colSpan="3"></td>
          </tr>
        </tbody>
      </table>

      <p>
        उपचारासाठी काही प्रक्रियांमध्ये वेदना, भीती आणि अस्वस्थता कमी करण्यासाठी
        सेडेशनची आवश्यकता असते.
      </p>

      <h6 className="fw-bold">सेडेशन</h6>

      <p>
        उपचार किंवा प्रक्रियेदरम्यान रुग्णाला आरामदायी व शांत वाटण्यासाठी वापरली
        जाणारी पद्धत.
      </p>

      <h6 className="fw-bold">सेडेटिव्ह औषधे</h6>

      <p>झोप, विश्रांती व शांतता मिळवून देणारी औषधे.</p>

      <h6 className="fw-bold">सेडेशनचे प्रकार</h6>

      <ul>
        <li>Minimal Sedation</li>
        <li>Moderate Sedation</li>
        <li>Deep Sedation</li>
      </ul>

      <h6 className="fw-bold">संभाव्य धोके</h6>

      <ul>
        <li>जास्त झोप येणे</li>
        <li>उलट्या होणे</li>
        <li>श्वास घेण्यास त्रास</li>
        <li>ऑक्सिजन कमी होणे</li>
        <li>रक्तदाब कमी होणे</li>
      </ul>

      <h5 className="text-center mt-4">रुग्ण / नातेवाईक यांची संमती</h5>

      <div className="border p-3">
        मला सेडेशन, त्याचे फायदे, धोके, पर्यायी उपाय व आपत्कालीन उपचार याबाबत
        संपूर्ण माहिती देण्यात आलेली आहे. माझ्या सर्व प्रश्नांची समाधानकारक
        उत्तरे मिळालेली आहेत.
      </div>
    </div>
  );
};

export default SedationFormMarathi;
