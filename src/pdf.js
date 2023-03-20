import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import React from 'react';


function MyPDF() {
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
     <div style={{ height: '750px' }}>
        <Viewer fileUrl="./part222.pdf" />
    </div>
    </Worker>
    </div>
  );
}

export default MyPDF;