import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../component';
import { getDetailRepositoryByUser } from '../../../../redux/action/repositorys';

let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';

let researchMock = {
  judul: 'Rounding corners separa tely Ro unding corners separately',
  image: img,
  pengarang: 'Bustomi',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  bahasa: 'Indonesia',
  tahunterbit: '12/12/2020',
  penerbit: '233',
  isbn: '',
};
function DetailResearch(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [research, setResearch] = React.useState(null);

  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    props.getDetailRepositoryByUser(id).then(res => {
      if (res.resp) {
        setProcessing(false);
        setResearch(res.data);
      }
    });
  }, []);
  function redirectToLogin() {
    props.history.push('/auth/login');
  }

  if (processing && research == null) return null;
  let pdfList = [];
  if (research !== null) {
    if (pdfList.abstrack) {
      pdfList.push({
        url: pdfList.abstrack,
        type: 'abstrack',
      });
    }
    for (let pdf in research) {
      if (research[pdf] && pdf.indexOf('bab') - 1 == -1) {
        pdfList.push({
          url: research[pdf],
          type: pdf,
        });
      }
    }
  }
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <section className="py-16 lg:py-24 w-full">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Detail Research | Ebni</title>
        </Helmet>
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/daftar-riset?kategori=pusat')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {research !== null && (
          <div class="flex  w-full">
            <div class="flex w-full text-gray-700 bg-white px-20 py-10  m-2">
              <div className="w-4/12 ">
                <div className="bg-white rounded-lg  border-gray-300">
                  <img
                    // src={`http://localhost:2000/img/images/${research.image.split('/').pop()}`}
                    src={img}
                    alt=""
                    style={{
                      height: 310,
                      width: 300,
                    }}
                  />
                </div>
              </div>
              <div className="w-8/12 px-5">
                <div className="text-lg font-bold">{research.title}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                {/* <div className="flex mt-3 ">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="far fa-star text-yellow-700" />
                  </div>
                  <div> 4.48 (606,907 ratings by Goodreads)</div>
                </div> */}
                <div> Paperback | {research.bahasa}</div>
                <div>{`By (author) ${research.name}`}</div>
                <div className="py-1 font-bold">Description:</div>
                <div>{research.description}</div>
              </div>
            </div>
          </div>
        )}
        {research !== null && (
          <div className="flex mt-5  w-full">
            <div className="flex w-3/6 text-gray-700 bg-white px-20 py-10  m-2">
              <div className="w-full px-5">
                <div className="text-lg font-bold">Pengarang</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div> Nama : {research.name}</div>
                <div> Jenis : {research.type} </div>
                <div> Penyunting : {research.editor} </div>
                <div> Penerjemah : {research.translateBy} </div>
              </div>
            </div>

            <div class="w-3/6  bg-white px-10 py-10 m-2">
              <div className="text-lg font-bold">Penerbit</div>
              <div
                className="bg-gray-400 w-full mt-2 mb-2"
                style={{
                  height: 1,
                }}
              ></div>
              <div> Nama : {research.university}</div>
              <div> Kota : {research.city} </div>
              <div> Tahun : {research.releaseYear}</div>
            </div>
            <div class="w-3/6  bg-white px-10 py-10 m-2">
              <div className="text-lg font-bold">Preview</div>
              <div
                className="bg-gray-400 w-full mt-2 mb-2"
                style={{
                  height: 1,
                }}
              ></div>
              {pdfList.map((pdf, key) => {
                return (
                  <div key={key} className="flex mt-3 ">
                    <div className="flex items-center">
                      <i className="fas fa-link text-yellow-700" />
                    </div>
                    <div className="text-blue-600 ml-3 underline cursor-pointer capitalize">
                      {' '}
                      {pdf.type}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
      {/* <Modal
        title="Authentication required"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
      >
        <div className="my-5">Silahkan Login terlebih dahulu</div>
      </Modal> */}
    </div>
  );
}
export default withRouter(connect(null, { getDetailRepositoryByUser })(DetailResearch));
