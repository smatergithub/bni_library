import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { contactUs } from 'redux/action/user';
import { ToastSuccess, Footer } from 'component';

function Faq(props) {
  let [msgObj, setMsgObj] = React.useState({
    email: '',
    name: '',
    message: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.contactUs(msgObj).then(res => {
      if (res.resp) {
        setMsgObj({
          email: '',
          name: '',
          message: '',
        });
        ToastSuccess('Feedback berhasil di kirim, silahkan menunggu balasan dari pihak BNI');
      }
    });
  }
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>F A Q | Ebni</title>
      </Helmet>
      <section className="relative py-20 mt-10">
        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&h=600&q=40"
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold">Q n A</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Apa itu Digital Library "Media Hybrids" ? Merupakan Sebuah platform perpustakaan
                  digital yang dapat mempermudah pegawai BNI untuk mengakses buku-buku yang tersedia
                  di perpustakaan BNI Corporate University dan REN. Selain Itu mempermudah
                  teman-teman mahasiswa atau mahasiswi untuk melakukan riset dengan BNI sebagai
                  Objeknya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 relative block bg-orange-500">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{
            height: '80px',
            transform: 'translateZ(0px)',
          }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-orange-500 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Got Idea?</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-white">
                Bagaimana dengan situs Digital library ini? Berikan kritik dan saran anda yang
                membangun agar kami dapat memperbaiki kekurangan kami dan dapat memberikan kenyaman
                kepada anda terimakasih.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative block py-24 lg:pt-0 bg-orange-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                <form className="flex-auto p-5 lg:p-10" onSubmit={e => handleSubmit(e)}>
                  <h4 className="text-2xl font-semibold">Kontak Kami</h4>
                  {/* <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                    Complete this form and we will get back to you in 24 hours.
                  </p> */}
                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="full-name"
                    >
                      Full Name
                    </label>
                    <input
                      onChange={e => setMsgObj({ ...msgObj, name: e.target.value })}
                      type="text"
                      value={msgObj.name}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Full Name"
                      style={{
                        transition: 'all 0.15s ease 0s',
                      }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      value={msgObj.email}
                      onChange={e => setMsgObj({ ...msgObj, email: e.target.value })}
                      type="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Email"
                      style={{
                        transition: 'all 0.15s ease 0s',
                      }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="message"
                    >
                      Message
                    </label>
                    <textarea
                      value={msgObj.message}
                      onChange={e => setMsgObj({ ...msgObj, message: e.target.value })}
                      rows="4"
                      cols="80"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Type a message..."
                    ></textarea>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-green-600 w-full text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{
                        transition: 'all 0.15s ease 0s',
                      }}
                      disabled={
                        msgObj.name.trim().length === 0 ||
                        msgObj.email.trim().length === 0 ||
                        msgObj.message.trim().length === 0
                      }
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default connect(null, { contactUs })(Faq);
