import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";


function AdmissionConsentF2Eng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                ADMISSION CONSENT
            </h4>

            <Table_Form />

            <div>
                <p className="paragraph">
                    AUTHORIZATION FOR INVESTIGATION, PROCEDURE, TREATMENT, RELEASE OF INFORMATION AND PAYMENTS
                    (Explained to me in my spoken language). <br />
                    I, the undersigned <span><SignaturePad width={300} height={30} design="line"/></span>(name of the patient / relative) do hereby give my consent
                    in full sense and sound mind for my/patient’s admission to <b>SHRADDHA HOSPITAL AND ICU</b>,I hereby authorize the above hospital,
                    Physicians on its medical staff, members of house staff, nursing staff and other employees of the hospital to provide such care and
                    administer such diagnostic, radiological and/or therapeutic procedures and treatment as in the judgment of the physicians is deemed
                    necessary or advisable in my / above patient’s care. I acknowledge the fact that the hospital has the authority to dispose off specimens taken
                    for laboratory or pathology examination. I hereby authorize any or all persons caring for me to review and/or release my personal health
                    information to other healthcare providers treating me/patient during this hospitalization. I also authorize the doctor or hospital staff to take
                    pictures or video of my condition for academic purposes. I hereby certify that I have read and understand this form and that no guarantees
                    have been made to me as to the results of treatment and examinations done in the hospital. <br />
                    I hereby authorize and direct the hospital and/or its representatives having treated me to release to government agencies, insurance
                    careers or others who are financially liable for my/patient’s hospitalization and medical care, all information needed to substantiate
                    payment for such hospitalization and medical care and to permit representatives thereof to examine and make copies of all records relating
                    to such care and treatment. <br />
                    I have been explained about the approximate cost of treatment. I have also been explained that the cost of medical treatment depends
                    on the number of days of hospitalization, area of hospitalization, investigations performed, drugs and consumables used, procedures and
                    surgeries performed, professional fee charged, nature of illness, severity of illness and variety of other factors. Therefore the estimate
                    given to me may vary significantly from the estimate, and the amount mentioned in the final bill shall be the final amount payable to the
                    hospital. I understand that interim intimation of the bill will be presented on a regular basis. Payment shall be made by cash/credit/D.D. I
                    understand that for credit cases, authorization letter is essential at the time of admission. In case the authorization is obtained, the amount
                    paid as advance shall be refunded to me/patient and if there is no authorization received till discharge the bill shall be settled in full by
                    me/patient. <br />
                    It has been explained that a certain fixed amount will be required to be deposited at the time of admission. In case of a package entire
                    amount needs to be paid on admission. <br />
                    I undertake full responsibility of clearing all dues payable to the hospital authorities during my/patient’s stay. In case of any eventuality
                    occurring, I promise to arrange to the full payment of dues either by me or immediate legal heirs of the patient immediately. In the event
                    of my failure to clear off all dues to the hospital, at the time of my/patient’s discharge, it shall be open to the hospital to take civil and
                    criminal action against me. I shall not leave the hospital unless all the dues are cleared and full and final payment is done.
                    I acknowledge the receipt of Patient information leaflet of the hospital, which includes Patient’s Rights and Responsibilities and agree
                    to abide by them. All cash, jewelry and other valuable shall be removed by me to a place of safety. I shall not hold the hospital authorities
                    responsible for any kind of loss sustained by me or my relatives. <br />
                    <p>
                        The above information is explained to me in <span><SignaturePad width={200} height={30} design="line"/></span> language by <br />
                        <span><SignaturePad width={300} height={30} design="line"/></span> (interpreter) as I don’t understand English
                    </p>
                    <DeclarationInfo />
                </p>
            </div>

        </div>

    )
}

export default AdmissionConsentF2Eng;