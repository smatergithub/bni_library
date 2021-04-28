import React from 'react';
import DummyImage from '../../../../../assets/dummyImage.png';
function Information({ user, changePages }) {
  React.useEffect(() => {
    if (user && user.mapUrl) {
      setTimeout(() => {
        if (document.getElementsByTagName('iframe')[0]) {
          document.getElementsByTagName('iframe')[0].style.width = '100%';
          document.getElementsByTagName('iframe')[0].style.height = '150';
        }
      }, 3000);
    }
  });
  if (user === null) return null;
  const ParserHTML = (htmlDocument) => {
    return {
      __html: htmlDocument,
    };
  };
  return (
    <div class="bg-white rounded-lg shadow-lg pl-10 relative">
      <div class="px-4 py-8 flex">
        <div class="h-24 w-24 rounded-full ">
          <img
            src={user.url_img ? user.url_img : DummyImage}
            alt=""
            className="h-24 w-24 rounded-full"
          />
        </div>
        <div className="h-32 flex-start px-8">
          <h4 class=" text-lg tracking-wide uppercase leading-tight">{user.nama}</h4>
          <div class="text-sm text-gray-600">{user.jabatan}</div>
          <div class="mt-1 text-sm text-gray-700">{user.unit}</div>
        </div>
        <button
          className="absolute lg:mx-0 hover:underline bg-orange-500 text-white  rounded-sm h-10 px-5"
          style={{
            right: '2em',
            textDecoration: 'none',
          }}
          onClick={() => changePages(true)}
        >
          Selengkapnya
        </button>
      </div>
      {user.mapUrl ? (
        <div className="relative w-full mb-3">
          <div
            style={{ width: '100% !important' }}
            dangerouslySetInnerHTML={ParserHTML(user.mapUrl)}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
export default Information;
