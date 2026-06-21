import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";

function AnaesthesiaMar() {
  return (
    <div className="consent-form">
      <h2 className="title">श्रद्धा हॉस्पिटल, दौंड</h2>

      <h4 className="title">भूल देण्यासाठी लेखी संमती</h4>

      <Table_Form />

      <p>
        निदान :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <p>
        शस्त्रक्रियेचे नाव :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <p>
        शस्त्रक्रियेची तारीख व वेळ :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <p>
        भूल प्रकार :
        <SignaturePad width={250} height={30} design="line" />
      </p>

      <ol>
        <li>
          माझ्या डॉक्टरांना शस्त्रक्रिया करण्यासाठी भूल देण्याची गरज आहे याची
          मला जाणीव आहे.
        </li>

        <li>
          जनरल अनेस्थेशिया देताना श्वासनलिका टाकावी लागू शकते. त्यामुळे घसा
          दुखणे, आवाज बसणे किंवा दात सैल होणे यासारखे त्रास होऊ शकतात.
        </li>

        <li>प्रत्येक भूल प्रक्रियेमध्ये काही प्रमाणात धोका असतो.</li>

        <li>
          जंतुसंसर्ग, रक्तस्त्राव, औषधाची प्रतिक्रिया, लकवा, हृदयविकाराचा झटका
          किंवा मृत्यू यांसारखे गंभीर परिणाम क्वचित होऊ शकतात.
        </li>

        <li>रुग्णाच्या शारीरिक स्थितीनुसार भूल प्रकार बदलू शकतो.</li>

        <li>डॉक्टरांनी निवडलेल्या उपचारास मी संमती देत आहे.</li>

        <li>स्थानिक भूल अपुरी पडल्यास इतर भूल पद्धती वापरल्या जाऊ शकतात.</li>

        <li>
          भूलतज्ञ किंवा त्यांच्या सहाय्यकांकडून भूल देण्यास मी संमती देत आहे.
        </li>

        <li>
          मला हा फॉर्म समजावून सांगितला असून मी तो पूर्णपणे समजून घेतला आहे.
        </li>
      </ol>

      <br />

      <p>
        सही :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        नाव :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        तारीख :
        <SignaturePad width={150} height={40} design="line" />
      </p>

      <p>
        वेळ :
        <SignaturePad width={150} height={40} design="line" />
      </p>

      <br />

      <p>
        साक्षीदार :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        भूलतज्ञ :
        <SignaturePad width={250} height={40} design="line" />
      </p>

      <p>
        माहिती समजावणारे :
        <SignaturePad width={250} height={40} design="line" />
      </p>
    </div>
  );
}

export default AnaesthesiaMar;
