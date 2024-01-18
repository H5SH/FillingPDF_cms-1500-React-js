import logo from './logo.svg';
import './App.css';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './pdf/MyDocument';
import {Document, Page} from 'react-pdf'
import { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {

  
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(pageNumber);
  }

  return (
    <div>
      <Document file='https://www.cigna.com/static/www-cigna-com/docs/form-cms1500.pdf'
      onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={numPages}/>
      </Document>
    </div>
    // <PDFViewer>
    //   <Form />
    // </PDFViewer>
  );
}

export default App;
