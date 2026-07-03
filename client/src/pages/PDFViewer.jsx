import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const pdfUrl = state?.pdfUrl;

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setScale(scale - 0.2)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            -
          </button>

          <button
            onClick={() => setScale(scale + 0.2)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>

      <div className="flex justify-center gap-5 mt-8">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Previous
        </button>

        <h2 className="text-xl font-bold">
          {pageNumber} / {numPages}
        </h2>

        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
