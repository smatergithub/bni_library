import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { getEbookPreview } from '../../../../redux/action/ebookUser';
import pdfFile from '../../../../assets/test.pdf';
import ebooks from 'redux/reducer/modules/ebooks';

function EbookPreview(props) {
  const parsed = queryString.parse(props.location.search);
  const [ebook, setEbook] = React.useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    // setNumPages(numPages);
    console.log(numPages);
  }
  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    let { id } = parsed;
    props.getEbookPreview(id).then(res => {
      if (res.resp) {
        setEbook(res.data);
      }
      console.log(res);
    });
  }, []);
  return (
    <div className="w-full">
      {ebook && (
        <Document
          file={{ data: ebook }}
          onLoadSuccess={onDocumentLoadSuccess}
          error={e => console.log(e)}
          className="custom-pdf"
        >
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
}
export default connect(null, { getEbookPreview })(withRouter(EbookPreview));
