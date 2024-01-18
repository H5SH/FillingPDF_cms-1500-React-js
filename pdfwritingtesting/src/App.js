import {Document, Page, pdfjs} from 'react-pdf'
import { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { getPdfFormCigna } from './__request/getPdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



function App() {

  const [pdf, setPdf] = useState('')
  const [response, setResponse] = useState('')

  async function WriteOnPdf(){
    const PdfBytes = await getPdfFormCigna()

    try{

    const pdfDoc = await PDFDocument.load(PdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica) 

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const {width, height} = firstPage.getSize()

    firstPage.drawText("Yes We Can Write On PDF In React!",{
      x: 5,
      y: height / 2 + 300,
      size:50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45)
    })

    const pdfBytes = await pdfDoc.save()
    const file = new Blob([pdfBytes], {type:'applocation/pdf'})
    setPdf(URL.createObjectURL(file))
  }catch(err){
    console.log(err)
    setResponse("Failed to Fetch PDF")
  }
  }

  useEffect(()=>{
    console.log("function")
    WriteOnPdf()
  },[])
  

  return (
    <div>
    {response ? <p>{response}</p>:
      <Document file={pdf}>
        <Page size={'A4'} pageNumber={1}/>
      </Document>
}
      
       {/* <PDFViewer>
        <MyDocument />
       </PDFViewer> */}
       
        {/* <Page>
          <Html>{html}</Html>
        </Page>
        */}
       
    </div>
   
  );
}

export default App;
