//import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
//import Button from '@mui/material/Button';
//import parser from "./parser";
import React, { useState } from "react";
import pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";
import "./UploadPDF.css";

function FileUpload() {
  const [pdfContent, setPdfContent] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      console.log("File Loaded");
      const contents = e.target.result;

      try {
        const pdf = await pdfjs.getDocument(contents).promise;
        console.log("PDF Loaded");
        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText;
        }

        setPdfContent(extractedText);
        console.log("extracted Contents:", extractedText);
      } catch (error) {
        console.error("Error parsing the PDF", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        className="uploadPDF"
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
      />
      <div>{pdfContent}</div>
    </>
  );
}
export default FileUpload;



// Pdf to text

/*
const fs = require('fs');
const pdfparse = require('pdf-parse');
const pdffile = fs.readFileSync('./EL20231002005.pdf'); // path to the file

// get info from pdf
pdfparse(pdffile).then(function (data){
    // PDF text
    console.log(data.text.trim());
    }).catch(function(error){
        console.log("Error parsing the pdf")
})



import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    try {
      const formData = new FormData();
      formData.append('pdfFile', file);

      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Specify the accepted file type
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF file here, or click to select one</p>
      </div>
    </div>
  );
};

export default FileUpload;




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