import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";

function GenericSurgeryConsentMar() {
  return (
    <div className="consent-form">
      <h2 className="title">श्रद्धा हॉस्पिटल, दौंड</h2>

      <h4 className="title">शस्त्रक्रियेबाबत संमती</h4>

      <Table_Form />

      <p className="paragraph">
        माझ्या आजारासंबंधी तसेच शस्त्रक्रियेसंबंधी आणि त्यानंतर होणाऱ्या
        गुंतागुंतीबद्दल मला समजेल अशा भाषेत माहिती देण्यात आलेली आहे.
      </p>

      <p className="paragraph">
        शस्त्रक्रिया न केल्यास होणारे धोके तसेच शस्त्रक्रियेदरम्यान उद्भवू
        शकणाऱ्या गुंतागुंतींबाबत मला समजावून सांगितले आहे.
      </p>

      <p className="paragraph">
        शस्त्रक्रियेदरम्यान रक्त किंवा रक्तघटक देण्याची आवश्यकता लागू शकते, याची
        मला कल्पना देण्यात आलेली आहे.
      </p>

      <p className="paragraph">
        इतर उपलब्ध उपचारपद्धती व त्यांचे धोके यांची माहिती मला देण्यात आलेली
        आहे.
      </p>

      <p className="paragraph">
        शस्त्रक्रियेदरम्यान काढण्यात आलेले अवयव किंवा ऊती तपासणीसाठी काही काळ
        जतन करण्यात येऊ शकतात व नंतर वैद्यकीय नियमांनुसार त्यांची विल्हेवाट
        लावली जाऊ शकते.
      </p>

      <p className="paragraph">
        वैद्यकीय शिक्षण किंवा संशोधनासाठी आवश्यक असल्यास छायाचित्रण अथवा व्हिडिओ
        रेकॉर्डिंग केले जाऊ शकते यास मी संमती देत आहे.
      </p>

      <p>
        पर्यायी उपचार :
        <SignaturePad width={450} height={35} design="line" />
      </p>

      <br />

      <p>
        शस्त्रक्रियेचे प्रमुख धोके :
        <SignaturePad width={450} height={35} design="line" />
      </p>

      <br />

      <p>
        शस्त्रक्रियेनंतर होऊ शकणाऱ्या गुंतागुंती :
        <SignaturePad width={450} height={35} design="line" />
      </p>

      <br />

      <p className="paragraph">
        शस्त्रक्रियेच्या निकालाबाबत कोणतीही हमी देण्यात आलेली नाही.
      </p>

      <p className="paragraph">
        मला प्रश्न विचारण्याची संधी देण्यात आली असून सर्व प्रश्नांची समाधानकारक
        उत्तरे मिळाली आहेत.
      </p>

      <p className="paragraph">
        मला शस्त्रक्रियेची आवश्यकता, उपलब्ध पर्याय, संभाव्य धोके, गुंतागुंत आणि
        अपेक्षित परिणाम समजले आहेत.
      </p>

      <p>मी शस्त्रक्रिया / प्रक्रिया करण्यासाठी डॉक्टरांना परवानगी देत आहे.</p>

      <p>शस्त्रक्रियेसाठी आवश्यक असणाऱ्या भूल देण्यास माझी संमती आहे.</p>

      <p>
        वैद्यकीय गरजेनुसार अतिरिक्त उपचार किंवा प्रक्रिया करण्यासही माझी संमती
        आहे.
      </p>

      <p>
        उपचारादरम्यान डॉक्टरांना पूर्ण सहकार्य करेन व शस्त्रक्रियेनंतर दिलेल्या
        सूचनांचे पालन करेन.
      </p>

      <br />

      <p>
        साक्षीदाराचे नाव :
        <SignaturePad width={300} height={35} design="line" />
      </p>

      <p>
        सही :
        <SignaturePad width={200} height={35} design="line" />
      </p>

      <p>
        पेशंटशी नाते :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <p>
        दिनांक व वेळ :
        <SignaturePad width={250} height={35} design="line" />
      </p>

      <br />

      <p>
        पेशंटचे नाव :
        <SignaturePad width={300} height={35} design="line" />
      </p>

      <p>
        सही :
        <SignaturePad width={200} height={35} design="line" />
      </p>

      <br />

      <p>
        शल्यचिकित्सकाचे नाव :
        <SignaturePad width={300} height={35} design="line" />
      </p>

      <p>
        सही :
        <SignaturePad width={200} height={35} design="line" />
      </p>

      <br />

      <p>
        शिक्का :
        <SignaturePad width={200} height={35} design="line" />
      </p>
    </div>
  );
}

export default GenericSurgeryConsentMar;
