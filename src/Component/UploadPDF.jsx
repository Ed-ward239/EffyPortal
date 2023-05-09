import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import pdfjsLib from "pdfjs-dist";
import "./UploadPDF.css";

function FileUpload() {
  const [pdfText, setPdfText] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const buffer = event.target.result;
      const loadingTask = pdfjsLib.getDocument(new Uint8Array(buffer));
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const pageText = await page.getTextContent(); // Extract data
      const text = pageText.items.map((item) => item.str).join("\n");
      setPdfText(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p className="ddText">Drag & drop a PDF file here<button className="fileBtn">Select File</button></p>
      {pdfText && <p>{pdfText}</p>}
    </div>
  );
}

export default FileUpload;