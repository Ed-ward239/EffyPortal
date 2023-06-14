import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import pdfjsLib from "pdfjs-dist";
import "./UploadPDF.css";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@mui/material/Button';


function FileUpload() {
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const handleUpload = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        if (success ===  true)
        {
          setSuccess(true);
          setLoading(false);
        }
      }, 2000);
    }
  };

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
    <div className="pdfBox" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button className="uploadPDF" variant="outlined" startIcon={<PlaylistAddIcon/>} onClick={handleUpload}>Upload PDF</Button> 
        {pdfText && <p>{pdfText}</p>}
    </div>
  );
}
export default FileUpload;




// Pdf to text


/*    async function parsePDF(file) {
        try {
          const pdfBytes = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(pdfBytes);
      
          const form = pdfDoc.getForm();
          const fields = form.getFields();
      
          return fields.map((field) => field.getFullName());
        } catch (error) {
          console.error('Error parsing PDF:', error);
          return [];
        }
      }
      

      function PDFFieldParser() {
        const [fields, setFields] = useState([]);
      
        const handleFileChange = async (event) => {
          const file = event.target.files[0];
          const extractedFields = await parsePDF(file);
          setFields(extractedFields);
        };
      
        return (
          <div>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            {fields.length > 0 && (
              <ul>
                {fields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            )}
          </div>
        );
      } */