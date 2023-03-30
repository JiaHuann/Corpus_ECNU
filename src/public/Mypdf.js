import { Worker, Viewer } from '@react-pdf-viewer/core';
import React from 'react';

const MyPDF = (props)=>{
    const {searchPluginInstance} = props
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">

        <div style={{ height: '1000px' }}>
            <Viewer fileUrl="../../assets/book_file/part222.pdf" defaultScale={2} plugins={[searchPluginInstance]} />
        </div>
    </Worker>
    )
}
export default MyPDF;