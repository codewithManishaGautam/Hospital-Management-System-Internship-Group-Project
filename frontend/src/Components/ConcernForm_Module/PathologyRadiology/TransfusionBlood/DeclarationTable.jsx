import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
 function DeclarationTable({doctor,Witness,PatientRelative,sign,name,address,age,year,signThumb,date}) 
{
        return(
            <div>
                <div>
                    <table className="table table-bordered text-center align-middle">
                        <thead>
                            <tr>
                                <th>{doctor}</th>
                                <th>{Witness}</th>
                                <th>{PatientRelative}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr style={{ height: "150px" }}>
                                <td>
                                    <div className="mb-3 text-center align-middle">
                                        <strong>{name}</strong>
                                        <SignaturePad width={170} height={30} design="line" />
                                        <SignaturePad width={170} height={30} design="line" />
                                    </div>
                                </td>

                                <td>
                                    <div className="text-center align-middle">
                                        <strong>{sign}</strong>
                                        <br />
                                        <SignaturePad width={180} height={40} design="border" />
                                    </div>

                                    <div className="mt-2">
                                        <strong>{name}</strong>
                                        <br />
                                        <SignaturePad width={180} height={30} design="line" />
                                        <SignaturePad width={180} height={30} design="line" />
                                    </div>

                                    <div className="mt-2">
                                        <strong>{address}</strong>
                                        <br />
                                        <SignaturePad width={180} height={30} design="line" />
                                        <SignaturePad width={180} height={30} design="line" />
                                    </div>

                                   
                                </td>

                                <td>
                                    <div className="mb-3">
                                        <strong>{signThumb}</strong>
                                        <br />
                                        <SignaturePad width={200} height={40} design="border" />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>{date}</strong>
                                    <br />
                                    <input type="datetime-local" />
                                    
                                </td>

                                <td >
                                    <div className="col-4">
                                            <strong>{age}</strong>
                                            <br />
                                            <SignaturePad width={100} height={30} design="line" />
                                        </div>

                                        <div className="col-4">
                                            <strong>{year}</strong>
                                            <SignaturePad width={100} height={30} design="line" />
                                        </div>

                                        <div className="col-4">
                                            <strong>{date}</strong>
                                            <input type="datetime-local"/>
                                        </div>
                                </td>

                                <td>
                                    <strong>{date}</strong>
                                    <br />
                                    <input type="datetime-local" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
}

export default DeclarationTable;