import React, { useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { getEbookPreview } from '../../../../../redux/action/ebookUser';

function EbookPreview(props) {
  const parsed = queryString.parse(props.location.search);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [ebook, setEbook] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }
  React.useEffect(() => {
    setLoading(true);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    let { id } = props;
    props.getEbookPreview(id).then(res => {
      if (res.resp) {
        setLoading(false);
        setEbook(res.data);
      }
    });
  }, []);
  return (
    <div className="w-full">
      {loading && (
        <div className="w-full mx-auto">
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
      )}
      {ebook && (
        <React.Fragment>
          <Document
            file={{ data: ebook }}
            onLoadSuccess={onDocumentLoadSuccess}
            className="custom-pdf"
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="flex justify-center  mt-10">
            <nav className="relative z-0 inline-flex shadow-sm">
              <div
                onClick={() => {
                  if (pageNumber < 2) {
                    return;
                  } else {
                    setPageNumber(pageNumber - 1);
                  }
                }}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Previous"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    clipRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                href="#"
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700  transition ease-in-out duration-150"
              >
                {pageNumber} of {totalPages}
              </div>

              <div
                onClick={() => {
                  if (pageNumber > totalPages - 1) {
                    return;
                  } else {
                    setPageNumber(pageNumber + 1);
                  }
                }}
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Next"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </nav>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
export default connect(null, { getEbookPreview })(withRouter(EbookPreview));
