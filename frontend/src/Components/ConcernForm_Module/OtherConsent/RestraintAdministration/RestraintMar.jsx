import React from "react";
import { useState } from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import RestraintAssestmentTable from "./RestraintAssestmentTable";
import RestraintDayTable from "./RestraintDayTable";
import RestraintMoreInfo from "./RestraintMoreInfo";
import RestraintEng from "./RestraintEng";




function RestraintMar() {
    const [tableCount, setTableCount] = useState(0);


    const tables = Array.from({ length: Number(tableCount) || 0 });
    const [days, setDays] = useState(3);

    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                रुग्णाला शारीरिक बंधने (Restraint) लावण्याबाबतची नोंदवही
            </h4>

            <p className="title">
                (हे प्रपत्र परिचारिका / नर्स यांनी भरावयाचे आहे)
            </p>
            <Table_Form />
            <div>

                <RestraintMoreInfo />

                <div>
                    <p className="paragraph">
                        <b>
                            संमती – नातेवाईकाने स्वतःच्या हस्ताक्षरात भरावयाची
                        </b>
                        <br />
                        मी श्री./श्रीमती <span><SignaturePad width={550} height={30} design="line"/></span>, रुग्ण Mrs. <span><SignaturePad width={350} height={30} design="line"/></span>
                        यांचा/यांची <span><SignaturePad width={200} height={30} design="line"/></span> (रुग्णाशी नाते) असून, मला रुग्णास शारीरिक बंधने (Restraints) 
                        लावण्याबाबत सविस्तर माहिती समजावून सांगण्यात आली आहे. माझ्या रुग्णाच्या सुरक्षिततेसाठी शारीरिक बंधने वापरणे आवश्यक असल्याचे मला समजले असून, त्यास मी 
                        पूर्ण संमती देत आहे.मला शारीरिक बंधने वापरण्याशी संबंधित संभाव्य धोके व गुंतागुंत याबाबतही डॉक्टर/परिचारिका/प्रशासकीय अधिकारी <span><SignaturePad width={272} height={30} design="line"/></span> 
                        (समजावून सांगणाऱ्या व्यक्तीचे नाव) यांनी सविस्तर माहिती दिली आहे व ती मला पूर्णपणे समजली आहे.
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

export default RestraintMar;