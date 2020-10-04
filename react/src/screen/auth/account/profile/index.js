import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { getMe } from '../../../../redux/action/user';
import Information from './component/information';
import EditUser from './component/editForm';
function Profile(props) {
  const parsed = queryString.parse(props.location.search);
  let [isEditUser, setIsEditUser] = React.useState(false);
  let [processing, setProcessing] = React.useState(false);
  let [user, setUser] = React.useState(null);
  React.useEffect(() => {
    let { edit } = parsed;

    props.getMe().then(res => {
      setProcessing(false);
      if (res.resp) {
        setUser(res.data);
        if (edit && edit === 'true') {
          setIsEditUser(true);
        }
      }
    });
  }, []);
  React.useEffect(() => {
    if (!isEditUser) {
      props.getMe().then(res => {
        setProcessing(false);
        if (res.resp) {
          setUser(res.data);
        }
      });
    }
  }, [isEditUser]);
  if (processing && user === null) return null;
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Akun | E-BNI</title>
      </Helmet>
      <div className="bg-orange-300 uppercase text-gray-900 text-base font-semibold py-4 pl-6">
        Informasi Kontak
      </div>
      {!isEditUser ? (
        <Information user={user} changePages={setIsEditUser} />
      ) : (
        <EditUser changePages={setIsEditUser} />
      )}
    </React.Fragment>
  );
}

export default connect(null, { getMe })(withRouter(Profile));
