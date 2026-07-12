import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
function DeclarationInfo() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label >दिनांक<br /><input type="date" /></label>
                <label>रुग्ण / नातेवाईकाची स्वाक्षरी <br /><SignaturePad width={200} height={40} design="border" /> </label>
            </div>
        </div>
    )
}

export default DeclarationInfo;