# PDFAndReact
The App will supposedly write given data on a PDF

## Final Solution
PDF-lib worked perfectly with minor inconvenience. 

## PDF-Lib 
Pdf-lib is nearly perfect libirary but its getFiled 
functions are not picking up any fields from the given pdf
And that is because of different filed names, you can display
All the filed names form.getFieds().find/filter/map(x=>console.log(x.name))
And with those names you can start filling your fields 

## pdfform.js
pdfform is potentional solution which might pick up the fields
but it is not available on node package instullar or npm 
