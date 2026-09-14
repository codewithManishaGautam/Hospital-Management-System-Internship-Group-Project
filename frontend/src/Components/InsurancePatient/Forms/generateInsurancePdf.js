const generateInsurancePdf = async () => {

    if (!insuranceRef.current) {
        alert("Insurance form not found");
        return null;
    }

    const form = insuranceRef.current;

    try {

        // ------------------------------------------------
        // Current actual form width
        // ------------------------------------------------

        const formWidth = Math.ceil(
            form.getBoundingClientRect().width
        );

        const formHeight = Math.ceil(
            form.scrollHeight
        );

        // ------------------------------------------------
        // Generate PDF from ORIGINAL rendered form
        // ------------------------------------------------

        const pdfBlob = await html2pdf()
            .set({

                margin: 5,

                filename:
                    `${patientId}_SBI_Insurance.pdf`,

                image: {
                    type: "jpeg",
                    quality: 1
                },

                html2canvas: {

                    scale: 2,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor: "#ffffff",

                    scrollX: 0,

                    scrollY: 0,

                    width: formWidth,

                    height: formHeight,

                    windowWidth:
                        Math.max(
                            document.documentElement.clientWidth,
                            formWidth
                        ),

                    windowHeight:
                        Math.max(
                            window.innerHeight,
                            formHeight
                        ),

                    logging: false,

                    // =====================================
                    // VERY IMPORTANT
                    // Copy React input values to PDF clone
                    // =====================================

                    onclone: (clonedDocument) => {

                        const clonedForm =
                            clonedDocument.querySelector(
                                ".sbi-form"
                            );

                        if (!clonedForm) {
                            return;
                        }

                        // ---------------------------------
                        // INPUT VALUES
                        // ---------------------------------

                        const originalInputs =
                            form.querySelectorAll("input");

                        const clonedInputs =
                            clonedForm.querySelectorAll("input");

                        originalInputs.forEach(
                            (originalInput, index) => {

                                const clonedInput =
                                    clonedInputs[index];

                                if (!clonedInput) {
                                    return;
                                }

                                // Text / number / date / email / time
                                if (
                                    originalInput.type !==
                                        "radio" &&
                                    originalInput.type !==
                                        "checkbox" &&
                                    originalInput.type !==
                                        "file"
                                ) {

                                    clonedInput.value =
                                        originalInput.value;

                                    clonedInput.setAttribute(
                                        "value",
                                        originalInput.value
                                    );
                                }

                                // ---------------------------------
                                // CHECKBOX
                                // ---------------------------------

                                if (
                                    originalInput.type ===
                                    "checkbox"
                                ) {

                                    clonedInput.checked =
                                        originalInput.checked;

                                    if (
                                        originalInput.checked
                                    ) {

                                        clonedInput.setAttribute(
                                            "checked",
                                            "checked"
                                        );

                                    } else {

                                        clonedInput.removeAttribute(
                                            "checked"
                                        );
                                    }
                                }

                                // ---------------------------------
                                // RADIO
                                // ---------------------------------

                                if (
                                    originalInput.type ===
                                    "radio"
                                ) {

                                    clonedInput.checked =
                                        originalInput.checked;

                                    if (
                                        originalInput.checked
                                    ) {

                                        clonedInput.setAttribute(
                                            "checked",
                                            "checked"
                                        );

                                    } else {

                                        clonedInput.removeAttribute(
                                            "checked"
                                        );
                                    }
                                }
                            }
                        );


                        // ---------------------------------
                        // TEXTAREA
                        // ---------------------------------

                        const originalTextareas =
                            form.querySelectorAll(
                                "textarea"
                            );

                        const clonedTextareas =
                            clonedForm.querySelectorAll(
                                "textarea"
                            );

                        originalTextareas.forEach(
                            (originalTextarea, index) => {

                                const clonedTextarea =
                                    clonedTextareas[index];

                                if (!clonedTextarea) {
                                    return;
                                }

                                clonedTextarea.value =
                                    originalTextarea.value;

                                clonedTextarea.textContent =
                                    originalTextarea.value;
                            }
                        );


                        // ---------------------------------
                        // SELECT
                        // ---------------------------------

                        const originalSelects =
                            form.querySelectorAll("select");

                        const clonedSelects =
                            clonedForm.querySelectorAll(
                                "select"
                            );

                        originalSelects.forEach(
                            (originalSelect, index) => {

                                const clonedSelect =
                                    clonedSelects[index];

                                if (!clonedSelect) {
                                    return;
                                }

                                clonedSelect.value =
                                    originalSelect.value;

                                clonedSelect.selectedIndex =
                                    originalSelect.selectedIndex;

                                Array.from(
                                    originalSelect.options
                                ).forEach(
                                    (
                                        originalOption,
                                        optionIndex
                                    ) => {

                                        const clonedOption =
                                            clonedSelect
                                                .options[
                                                optionIndex
                                            ];

                                        if (!clonedOption) {
                                            return;
                                        }

                                        clonedOption.selected =
                                            originalOption.selected;
                                    }
                                );
                            }
                        );


                        // ---------------------------------
                        // SIGNATURE
                        // ---------------------------------

                        const originalCanvases =
                            form.querySelectorAll(
                                "canvas"
                            );

                        const clonedCanvases =
                            clonedForm.querySelectorAll(
                                "canvas"
                            );

                        originalCanvases.forEach(
                            (originalCanvas, index) => {

                                const clonedCanvas =
                                    clonedCanvases[index];

                                if (!clonedCanvas) {
                                    return;
                                }

                                try {

                                    const image =
                                        clonedDocument.createElement(
                                            "img"
                                        );

                                    image.src =
                                        originalCanvas.toDataURL(
                                            "image/png"
                                        );

                                    image.style.width =
                                        `${originalCanvas.width}px`;

                                    image.style.height =
                                        `${originalCanvas.height}px`;

                                    image.style.display =
                                        "block";

                                    image.style.maxWidth =
                                        "100%";

                                    clonedCanvas
                                        .parentNode
                                        .replaceChild(
                                            image,
                                            clonedCanvas
                                        );

                                } catch (error) {

                                    console.error(
                                        "Signature copy error:",
                                        error
                                    );
                                }
                            }
                        );
                    }
                },

                jsPDF: {

                    unit: "mm",

                    format: "a3",

                    orientation: "portrait"
                },

                pagebreak: {

                    mode: [
                        "css",
                        "legacy"
                    ]
                }

            })
            .from(form)          // ⭐ ORIGINAL FORM
            .outputPdf("blob");

        return pdfBlob;

    } catch (error) {

        console.error(
            "Insurance PDF generation error:",
            error
        );

        alert(
            "PDF generation failed"
        );

        return null;
    }
};

export default generateInsurancePdf;