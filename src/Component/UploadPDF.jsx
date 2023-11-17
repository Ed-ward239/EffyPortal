import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FileUpload() {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        onChange={onFileChange}
        accept="application/pdf"
      />
      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => console.log(`Number of pages: ${numPages}`)}
        >
          <Page pageNumber={1} />
        </Document>
      )}
    </>
  );
}

export default FileUpload;

