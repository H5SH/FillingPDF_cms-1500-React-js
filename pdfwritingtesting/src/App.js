import {Document, Page, pdfjs} from 'react-pdf'
import { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { getPdfFormCigna } from './__request/getPdf';
import ReactPDF from '@react-pdf/renderer';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



function App() {

  const [pdf, setPdf] = useState('')
  const [response, setResponse] = useState('')

  async function WriteOnPdf(){
    const PdfBytes = await getPdfFormCigna()
    // var PdfBytes = new File([""], "form-cms1500.pdf")
    // console.log(PdfBytes)

    // const Pdf = require('./form-cms1500.pdf')
    // const PdfBytes = new ArrayBuffer(Pdf.readFile())
    // console.log(PdfBytes)

    try{
    
    const pdfDoc = await PDFDocument.load(PdfBytes)
   
    const form = pdfDoc.getForm()
    form.updateFieldAppearances()
    // const nameField = form.getTextField("CITY")
    const checkbox = form.getCheckBox("Self")

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica) 

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const {width, height} = firstPage.getSize()

    // firstPage.drawText("Hasham Asad",{
    //   x: 40,
    //   y: 654,
    //   size:10,
    //   font: helveticaFont,
    //   color: rgb(0, 0, 0),
    //   rotate: degrees(0)
    // })

    // firstPage.drawText("House no 49 BLock G4",{
    //   x: 40,
    //   y: 630,
    //   size: 10,
    // })

    const count = 0
    const pdfBytes = await pdfDoc.save()
    const file = new Blob([pdfBytes], {type:'applocation/pdf'})
    setPdf(URL.createObjectURL(file))
    // ReactPDF.render(file, `form-cms${count++}.pdf`)
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
