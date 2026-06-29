import React from "react";
import { useState } from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import RestraintAssestmentTable from "./RestraintAssestmentTable";
import RestraintDayTable from "./RestraintDayTable";
import RestraintMoreInfo from "./RestraintMoreInfo";




function RestraintEng() {
    const [tableCount, setTableCount] = useState(0);


    const tables = Array.from({ length: Number(tableCount) || 0 });
    const [days, setDays] = useState(3);

    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Form For Restraint Administration
            </h4>

            <p className="title">
                (To be completed by nurse)
            </p>
            <Table_Form />
            <div>

                <RestraintMoreInfo />

                <div>
                    <p className="paragraph">
                        CONSENT- To be filled by the relative in his/her hand writing I Mr/Ms. 
                        <span><SignaturePad width={300} height={30} design="line"/></span> of the patient
                        (Relative's name) <span><SignaturePad width={300} height={30} design="line"/></span> (Relation with the patient) have been explained about the restraint administration and
                        fully agree that the use of restraints is essential for my patient <span><SignaturePad width={300} height={30} design="line"/></span>
                         I have also been
                        informed about the risks and complications related to the use of restraints by the Doctor/Nurses Administrator (Name
                        of person explaining the relative)
                    </p>
                </div>

                <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={7}>8</option>
                    <option value={7}>9</option>
                    <option value={7}>10</option>
                </select>

                <RestraintDayTable totalDays={days} />


                <select
                    value={tableCount}
                    onChange={(e) => setTableCount(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                {tables.map((_, index) => (

                    <RestraintAssestmentTable
                        key={index}
                        number={index + 1}
                    />

                ))}

            </div>
        </div>
    )
}

export default RestraintEng;