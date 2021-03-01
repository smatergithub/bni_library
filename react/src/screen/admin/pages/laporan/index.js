import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { getMe, exportDataUser } from '../../../../redux/action/user';
import swal from 'sweetalert';
import UserAPI from '../../../../api/UserApi';
import { Button } from 'antd';
import Loader from '../../component/Loader';

const { RangePicker } = DatePicker;
const UsersList = props => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const ExportUser = (from, to) => {
    setIsLoading(true);
    UserAPI.exportDataUser(from, to)
      .then(response => {
        var reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {
          window.open(reader.result, '_blank');
        };
        reader.onerror = function(error) {
          console.log('Error: ', error);
        };
        setIsLoading(false);
      })
      .catch(err => {
        swal('Error!', 'Gagal Export Laporan', 'error');
      });
  };

  function onChange(date, dateString) {
    setStartDate(new Date(dateString[0]));
    setEndDate(new Date(dateString[1]));
  }

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="mb-10"
        >
          <div>
            <p style={{ fontSize: '26px' }} className="text-black">
              Laporan
            </p>
          </div>
        </div>
        {/* {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '600px',
              flex: '1 1 0',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        ) : users.data !== undefined && users.data.length > 0 ? (

        ) : (
          <NoData />
        )} */}
        <React.Fragment>
          <div
            className="min-w-full bg-white"
            style={{
              height: '600px  ',
              overflow: 'auto',
              padding: '48px',
            }}
          >
            <div style={{ width: '400px', paddingBottom: '64px' }}>
              <Space direction="vertical" size={12}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <div style={{ fontSize: '16px' }}>Laporan Pengguna</div>
                  <div>
                    {/* <a
                      href={UserAPI.exportDataUser(startDate, endDate)}
                      target="__blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button onClick={() => Export(startDate, endDate)}>Export</Button>
                    </a> */}
                    <Button
                      disabled={isLoading}
                      type="primary"
                      onClick={() => ExportUser(startDate, endDate)}
                    >
                      Export
                    </Button>
                  </div>
                </div>
                <div style={{ width: '400px' }}>
                  <RangePicker onChange={onChange} />
                </div>
              </Space>
            </div>
            <div style={{ width: '400px', paddingBottom: '64px' }}>
              <Space direction="vertical" size={12}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <div style={{ fontSize: '16px' }}>Laporan Daftar Pinjam Buku</div>
                  <div>
                    {/* <a
                      href={UserAPI.exportDataUser(startDate, endDate)}
                      target="__blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button onClick={() => Export(startDate, endDate)}>Export</Button>
                    </a> */}
                    <Button
                      disabled={isLoading}
                      type="primary"
                      onClick={() => ExportUser(startDate, endDate)}
                    >
                      Export
                    </Button>
                  </div>
                </div>
                <div style={{ width: '400px' }}>
                  <RangePicker onChange={onChange} />
                </div>
              </Space>
            </div>
            <div style={{ width: '400px', paddingBottom: '64px' }}>
              <Space direction="vertical" size={12}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <div style={{ fontSize: '16px' }}>Laporan Daftar Pinjam Ebook</div>
                  <div>
                    {/* <a
                      href={UserAPI.exportDataUser(startDate, endDate)}
                      target="__blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button onClick={() => Export(startDate, endDate)}>Export</Button>
                    </a> */}
                    <Button
                      disabled={isLoading}
                      type="primary"
                      onClick={() => ExportUser(startDate, endDate)}
                    >
                      Export
                    </Button>
                  </div>
                </div>
                <div style={{ width: '400px' }}>
                  <RangePicker onChange={onChange} />
                </div>
              </Space>
            </div>
          </div>
        </React.Fragment>
      </main>
    </div>
  );
};

let mapStateToProps = state => {
  return {
    role: state.users.role,
    me: state.users.me,
  };
};

export default connect(mapStateToProps, {
  getMe,
  exportDataUser,
})(UsersList);
