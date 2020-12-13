import React from 'react';

const Footer = () => {
  return (
    <div class=" bg-green-700 flex items-center justify-center  flex-col py-3">
      <div class="text-2xl font-bold tracking-wide mt-3" style={{ color: '#dbdad9' }}>
        BNI Corporate University
      </div>
      <div class="flex items-center justify-center mt-3">
        <a href="https://www.facebook.com/BNI/" target="_blank">
          <i
            className={`fab fa-facebook-square mr-3`}
            style={{ fontSize: '2em', color: '#dbdad9' }}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/pt.-bank-negara-indonesia-persero-tbk./"
          target="_blank"
        >
          <i className={`fab fa-linkedin mr-3`} style={{ fontSize: '2em', color: '#dbdad9' }} />
        </a>
        <a href="https://www.instagram.com/bni46/" target="_blank">
          <i className={`fab fa-instagram mr-3`} style={{ fontSize: '2em', color: '#dbdad9' }} />
        </a>
        <a href="https://twitter.com/bni" target="_blank">
          <i className={`fab fa-twitter mr-3`} style={{ fontSize: '2em', color: '#dbdad9' }} />
        </a>
        <a href="https://www.youtube.com/user/BNITVC" target="_blank">
          <i className={`fab fa-youtube mr-3 `} style={{ fontSize: '2em', color: '#dbdad9' }} />
        </a>
      </div>
      <div class="text-md font-normal tracking-wide mt-3" style={{ color: '#dbdad9' }}>
        © Hak Cipta 2020 PT. Bank Negara Indonesia (Persero), Tbk.
      </div>
    </div>
  );
};
export default Footer;
