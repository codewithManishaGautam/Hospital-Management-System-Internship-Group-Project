import React from "react";
import SignaturePad from "../SignaturePad";

function MinorTableMar() {
    return (
        <div>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Times New Roman"
                }}
            >

                <tbody>

                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            <b>प्रक्रियेचे नाव :</b>
                            <SignaturePad width="300px" height="30px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            <b>
                                निदान / उपचारासाठी करण्यात येणारी प्रक्रिया:
                            </b>
                            <SignaturePad width="350px" height="30px" design="line"/>
                        </td>

                    </tr>
                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                            
                        >
                            तातडीचे

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "20px"
                                }}
                            />

                            नियोजित

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "20px"
                                }}
                            />
                            
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            <b>
                                डॉक्टरांचे नाव :
                            <span style={{display:"inline-block"}}><SignaturePad width={200} height={25} design="line"/></span>
                            </b>

                        </td>

                    </tr>
                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            दिनांक व वेळ :
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            
                            <SignaturePad width="305" height="30px" design="line"/>


                        </td>

                    </tr>

                     <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width: "40%"
                            }}
                        >
                            <b>भूल देण्यात आली आहे</b>
                            
                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >
                            हो

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "50px"
                                }}
                            />

                            नाही

                            <input
                                type="checkbox"
                                style={{
                                    marginLeft: "5px",
                                    marginRight: "50px"
                                }}
                            />

                        </td>

                    </tr>
                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                height: "40px"
                            }}
                        >
                            भूल देण्याचा प्रकार व औषधाचे नाव तसेच त्याची क्षमता : <span><SignaturePad width="400px" height="80px" design="none"/></span>


                        </td>


                    </tr>

                </tbody>

            </table>

            <br /><br />

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Times New Roman"
                }}
            >

                <tbody>

                    <tr>

                        <td
                            colSpan="3"
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                height: "140px",
                                verticalAlign: "top"
                            }}
                        >

                            <b>
                                संबंधित धोके
                            </b>

                            <br />

                            या रुग्णामध्ये होऊ शकणारे संभाव्य धोके व गुंतागुंती :

                            <br /><br />

                            1.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span><br /><br />
                            2.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span><br /><br />
                            3.&nbsp;&nbsp; <span><SignaturePad width="650px" height="40px" design="line"/></span>

                           

                        </td>

                    </tr>

                    <tr>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >

                            रुग्णाची / नातेवाईकाची सही 
                            <SignaturePad width="200px" height="40px" />

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",

                            }}
                        >
                            दिनांक  <SignaturePad width="130px" height="40px" design="line"/>
                            
                        </td>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}
                        >

                            वेळ <SignaturePad width="130px" height="40px" design="line"/>

                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                width:"40%"
                            }}
                        >

                            अजाण रुग्ण असल्यास पालकाचे नाव 
                            <SignaturePad width="400px" height="35px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            रुग्णाशी नाते
                            <SignaturePad width="260px" height="35px" design="line"/>

                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            परिचारिकेचे नाव व सही 
                            <SignaturePad width="400px" height="35px" design="line"/>



                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            परिचारिकेचे सही
                            <SignaturePad width="200px" height="40px" />

                        </td>

                    </tr>

                    <tr>

                        <td
                            colSpan="2"
                            style={{
                                border: "1px solid black",
                                padding: "8px",
                                height: "60px"
                            }}
                        >

                            डॉक्टरांचे नाव व सही
                            <SignaturePad width="400px" height="35px" design="line"/>

                        </td>

                        <td
                            style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}
                        >

                            डॉक्टरांची सही
                            <SignaturePad width="200px" height="40px" />


                        </td>

                    </tr>

                </tbody>

            </table>
        </div>
    );
}

export default MinorTableMar;