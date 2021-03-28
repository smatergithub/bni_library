import React from 'react';
import UserAPI from '../../api/UserApi';
import ReactStars from 'react-rating-stars-component';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function Modal(props) {
  const { open, title, handleSubmit, userId, type } = props;
  let [rating, setRating] = React.useState(null);
  let [loading, setLoading] = React.useState(false);
  let [listBorrowBook, setListBorrowBook] = React.useState([]);
  let [listborrowEbook, setListBorrowEbook] = React.useState([]);

  const ratingChanged = newRating => {
    setRating(newRating);
  };

  const [form] = Form.useForm();

  const getLisDropdownListBorrowBook = () => {
    setLoading(true);
    UserAPI.getBorrowedBookItemNoRated(userId)
      .then(res => {
        setListBorrowBook(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const getLisDropdownListBorrowEbook = () => {
    setLoading(true);
    UserAPI.getBorrowedEbookItemNoRated(userId)
      .then(res => {
        setListBorrowEbook(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getLisDropdownListBorrowBook();
    getLisDropdownListBorrowEbook();
  }, [userId]);

  const onFinish = values => {
    console.log(values);
    let formData = {};
    formData['note'] = values.note;
    formData['rating'] = rating;

    handleSubmit(formData);
  };

  const RenderListDropdown = () => {
    let dropdownList;
    if (type.type === 'book') {
      dropdownList = listBorrowBook.map(item => {
        return <Option value={item.label}>{item.label}</Option>;
      });
    } else if (type.type === 'ebook') {
      dropdownList = listborrowEbook.map(item => {
        return <Option value={item.label}>{item.label}</Option>;
      });
    }

    return dropdownList;
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className={`modal-container bg-white w-11/12 md:max-w-md rounded shadow-lg  overflow-y-auto`}
              style={{
                width: '90% !important',
              }}
            >
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl text-center font-bold">{title}</p>
                </div>
                <div
                  className="px-10 pb-4"
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                  }}
                >
                  Silahkan isi rating terlebih dahulu untuk dapat memesan buku selanjutnya
                </div>
                <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                  <Form.Item
                    name="ratingBorrow"
                    label={`Daftar Pinjam `}
                    rules={[
                      {
                        required: true,
                        message: 'tolong pilih buku yang anda ingin beri rating',
                      },
                    ]}
                  >
                    <Select allowClear>{RenderListDropdown()}</Select>
                  </Form.Item>
                  <Form.Item name="note" label="Note">
                    <TextArea rows={4} />
                  </Form.Item>
                  <div>
                    {' '}
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold"
                      for="grid-password"
                    >
                      Rating
                    </label>
                    <ReactStars
                      count={6}
                      onChange={ratingChanged}
                      size={40}
                      activeColor="#ffd700"
                    />
                  </div>
                  <Form.Item>
                    <Button
                      className={`bg-orange-500 text-white active:bg-gray-700 text-sm mt-10 font-bold uppercase px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full`}
                      disabled={loading}
                      style={{
                        transition: 'all 0.15s ease 0s',
                      }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
