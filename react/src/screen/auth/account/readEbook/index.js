import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
function ReadEbook() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>READ | EBI</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">Wishlist</div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        <div class="videoWrapper">
          <iframe
            src="//drive.idcloudhost.com/s/ceJqxLg5wkgX5pf#pdfviewer"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
}
export default withRouter(ReadEbook);
