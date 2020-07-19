import React from 'react';
import { connect } from 'react-redux';
import { getMe } from '../../../../redux/action/user';
import Information from './component/information';
import EditUser from './component/editForm';
function Profile(props) {
  let [isEditUser, setIsEditUser] = React.useState(false);
  let [processing, setProcessing] = React.useState(false);
  let [user, setUser] = React.useState(null);
  React.useEffect(() => {
    props.getMe().then(res => {
      setProcessing(false);
      if (res.resp) {
        setUser(res.data);
      }
    });
  }, []);
  if (processing && user === null) return null;
  return (
    <React.Fragment>
      <div className="bg-gray-300 uppercase text-gray-900 text-base font-semibold py-4 pl-6">
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

export default connect(null, { getMe })(Profile);
