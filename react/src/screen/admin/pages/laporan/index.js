import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { getMe, exportDataUser } from '../../../../redux/action/user';
import swal from 'sweetalert';
import UserAPI from '../../../../api/UserApi';
import HistoryApi from '../../../../api/HistoryApi';
import { Button } from 'antd';
import Loader from '../../component/Loader';
import { Select } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const UsersList = props => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [type, setType] = React.useState('');

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
        setIsLoading(false);
        swal('Error!', 'Data Laporan Tidak Ditemukan', 'error');
      });
  };

  const ExportBorrowBook = (from, to) => {
    setIsLoading(true);
    HistoryApi.exportDataBook(from, to)
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
        setIsLoading(false);
        swal('Error!', 'Data Laporan Tidak Ditemukan', 'error');
      });
  };

  const ExportBorrowEbook = (from, to) => {
    setIsLoading(true);
    HistoryApi.exportDataEbook(from, to)
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
        setIsLoading(false);
        swal('Error!', 'Data Laporan Tidak Ditemukan', 'error');
      });
  };

  function onChangeExport(date, dateString) {
    setStartDate(dateString[0] + ' 12:17:55');
    setEndDate(dateString[1] + ' 12:17:55');
  }

  // function onChangeExportBorrowBook(date, dateString) {
  //   setStartDate(dateString[0] + ' 12:17:55');
  //   setEndDate(dateString[1] + ' 12:17:55');
  // }

  // function onChangeExportBorrowEbook(date, dateString) {
  //   setStartDate(dateString[0] + ' 12:17:55');
  //   setEndDate(dateString[1] + ' 12:17:55');
  // }

  function handleChangeSelect(value) {
    setType(value);
  }

  function onFilter() {
    switch (type) {
      case 'pengguna':
        ExportUser(startDate, endDate);
        break;
      case 'book':
        ExportBorrowBook(startDate, endDate);
        break;
      case 'ebook':
        ExportBorrowEbook(startDate, endDate);
        break;
      default:
        return null;
    }
  }

  let getDate = startDate == null ? true : false;
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

        <React.Fragment>
          <div
            className="min-w-full bg-white"
            style={{
              height: '600px  ',
              overflow: 'auto',
              padding: '48px',
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '600px',
                  flex: '1 1 0',
                  alignItems: 'center',
                }}
              >
                <Loader />
                <p>permintaan segera di proses</p>
              </div>
            ) : (
              <>
                {' '}
                <div style={{ width: '400px', paddingBottom: '64px' }}>
                  <Space direction="vertical" size={12}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ fontSize: '16px' }}>Export Laporan</div>
                      <div>
                        {/* <a
                      href={UserAPI.exportDataUser(startDate, endDate)}
                      target="__blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button onClick={() => Export(startDate, endDate)}>Export</Button>
                    </a> */}
                      </div>
                    </div>
                    <div style={{ width: '400px' }}>
                      <RangePicker disabled={isLoading} onChange={onChangeExport} />
                    </div>
                    <Select style={{ width: 400 }} onChange={handleChangeSelect}>
                      <Option value="pengguna">Daftar Pengguna</Option>
                      <Option value="buku">Daftar Peminjam Buku</Option>
                      <Option value="ebook">Daftar Peminjam Ebook</Option>
                    </Select>
                    <Button disabled={isLoading || getDate} type="primary" onClick={onFilter}>
                      Export
                    </Button>
                  </Space>
                </div>
              </>
            )}
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
