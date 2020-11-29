import React, { useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPreviewResearchByUser } from '../../../../../redux/action/repositorys';

function EbookPreview(props) {
  const parsed = queryString.parse(props.location.search);

  const [totalPages, setTotalPages] = React.useState(0);
  const [ebook, setEbook] = React.useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }
  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    let { id, type } = props;
    props.getPreviewResearchByUser(id, type).then(res => {
      if (res.resp) {
        setEbook(res.data);
      }
    });
  }, []);
  return (
    <div className="w-full">
      {ebook && (
        <div style={{ position: 'relative' }}>
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
      )}
    </div>
  );
}
export default connect(null, { getPreviewResearchByUser })(withRouter(EbookPreview));
