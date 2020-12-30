import React, { useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPreviewResearchByUser } from '../../../../../redux/action/repositorys';
import LoadingPreview from './LoadingPreview';

function EbookPreview(props) {
  const parsed = queryString.parse(props.location.search);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [ebook, setEbook] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }

  const retrievePreviewPDF = () => {
    setIsLoading(true);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    let { id, type } = props;
    props
      .getPreviewResearchByUser(id, type)
      .then(res => {
        if (res.resp) {
          setEbook(res.data);
          setIsLoading(false);
        }
      })
      .catch(err => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  React.useEffect(() => {
    retrievePreviewPDF();
  }, []);

  console.log('data ebook', ebook);
  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingPreview />
      ) : (
        ebook && (
          <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'auto' }}>
            <Document
              file={{ data: ebook }}
              size="A4"
              onLoadSuccess={onDocumentLoadSuccess}
              className="custom-pdf"
            >
              {Array.apply(null, Array(totalPages))
                .map((x, i) => i)
                .map(page => (
                  <Page pageNumber={page} wrap={false} />
                ))}
            </Document>
          </div>
        )
      )}
    </div>
  );
}
export default connect(null, { getPreviewResearchByUser })(withRouter(EbookPreview));
