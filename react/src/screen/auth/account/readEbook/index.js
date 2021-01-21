import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import {connect} from 'react-redux'
import {getEbookPreview} from 'redux/action/ebookUser'

function ReadEbook(props) {
  const parsed = queryString.parse(props.location.search);
  const [url,setUrl]= React.useState(null)
  const [loading,setLoading]= React.useState(false)
  React.useEffect(() => {
    let { ebookId } = parsed;
    setLoading(true);
    props.getEbookPreview(ebookId).then(res => {
      setLoading(false);
      if (res.resp) {
        setUrl(res.data.file)
      }
    });
  }, []);

  if(loading){
    return (
      <Loader active inline="centered">
    Loading
  </Loader>
    )
  }
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

            <div class="custom2">
                <iframe src={`${url}/preview`}></iframe>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default connect(null,{getEbookPreview}) (withRouter(ReadEbook));
