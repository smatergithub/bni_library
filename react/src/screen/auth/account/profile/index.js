import React from 'react';
import Information from './component/information';
import EditUser from './component/editForm';
function Profile() {
  let [isEditUser, setIsEditUser] = React.useState(false);
  return (
    <React.Fragment>
      <div className="bg-gray-800 uppercase text-white text-base font-semibold py-4 pl-6">
        Informasi Kontak
      </div>
      {!isEditUser ? (
        <Information changePages={setIsEditUser} />
      ) : (
        <EditUser changePages={setIsEditUser} />
      )}
    </React.Fragment>
  );
}

export default Profile;
