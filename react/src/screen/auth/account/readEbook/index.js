import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import EbookUserAPI from '../../../../api/EbookUserApi';

function ReadEbook(props) {
  const parsed = queryString.parse(props.location.search);
  const [url, setUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let { ebookId } = parsed;
    setLoading(true);
    EbookUserAPI.getPreviewByid(ebookId).then(res => {
      if (res.data) {
        setUrl(res.data.file);
        setLoading(false);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>READ | EBI</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">Ebook</div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        <div id="tutorial-pdf-responsive" class="custom1">
          <div className="overlay">.</div>
          {loading ? (
            <div
              style={{
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader active inline="centered">
                Loading
              </Loader>
            </div>
          ) : (
            <div class="custom2">
              <iframe src={`${url}/preview`}></iframe>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default connect(null)(withRouter(ReadEbook));
