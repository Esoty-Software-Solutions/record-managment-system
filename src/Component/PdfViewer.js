import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
function PdfViewer() {
  const [file, setFile] = useState("/assets/v.pdf");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {/* <Document file={"/assets/v.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document> */}

      <iframe
        src={`/assets/images/pdf-gen.pdf` + `#toolbar=0`}
        title="Async & Performance"
        width="800"
        height="800"
      />
    </div>
  );
}

export default PdfViewer;
