import {Document, Page, pdfjs} from 'react-pdf'
import { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { getPdfFormCigna } from './__request/getPdf';
import { saveAs } from 'file-saver'
import { StyleSheet } from '@react-pdf/renderer'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { fillFieldWithThereName } from './utility/utility';
import { fillFormUsingVariables } from './utility/fillFromUsingVariables';


// To display the pdf on Browser
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const styles = StyleSheet.create({
  page: {backgroundColor: 'tomato'},
  section: {color: 'white', textAlign: 'center', margin: 30, height: 40}
})


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
    // const out_buf = pdfform.transform(PdfBytes, {
    //   'CITY': "Lahore",
    //   'STATE': "Pakistan"
    // })
    

    // fields which are checkboxes can be indentified when getTextField throws an error
    // const checkboxes = [
    //   '276',
    //   'sex',
    //   'rel_to_ins' ,
    //   'ins_sex' ,
    //   'lab' ,
    //   'assignment' ,
    //   'pt_auto_accident' ,
    //   'other_accident' ,
    //   'ssn' ,
    //   'insurance_type' ,
    //   'ins_benefit_plan' ,
    //   'employment'
    // ]

    const buttons = ["Clear Form"]

    // TWO FUNCTION CALLS
    // setPdf(await fillFieldWithThereName(PdfBytes, buttons, 'champva'))
    setPdf(await fillFormUsingVariables(PdfBytes))


    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica) 

    // const pages = pdfDoc.getPages()
    // const firstPage = pages[0]
    // const {width, height} = firstPage.getSize()

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

    // const count = 0
    
    
    // to save the file
    //saveAs(pdf, `Filled-cms-1500.pdf`)
    // ReactPDF.render(file, `form-cms${count++}.pdf`)
  }catch(err){
    console.log(err)
    setResponse("Failed to Fetch PDF")
  }
  }

  useEffect(()=>{
    WriteOnPdf()
  },[])
  

  return (
    <div>
    {response ? <p>{response}</p>:
    <>
      <Document file={pdf} style={styles.section}>
      <a href={pdf} download={'Filled-cms-1500.pdf'} target='C:/H5SH/Work/FillingPDF_cms-1500-React-js'>DownLoad</a>
        <Page size={'A4'} pageNumber={1} style={styles.page}/>
      </Document>
      
      </>
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
