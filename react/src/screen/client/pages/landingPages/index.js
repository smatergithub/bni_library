import React from 'react';
import { Link } from 'react-router-dom';

function LandingPages(props) {
  let { history } = props;
  return (
    <React.Fragment>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:pr-10 md:w-3/5 justify-center items-start text-start md:text-left md:pt-20">
            <h1 className="text-3xl font-bold ">
              BNI Corporate University & Divisi Perencanaan Strategis
            </h1>
            <p className="leading-normal text-2xl mb-8 ">
              Media Hybrid Perpustakaan yang ada di BNI Corporate University dan Divisi Perencanaan
              Strategis yang menyediakan informasi buku-buku, jurnal, hasil riset baik secara
              hardcopy dan softcopy dalam meningkatkan kompetensi dan knowledge para BNI Hi-Movers{' '}
            </p>
            <Link to="/auth/register">
              <button className="mx-auto lg:mx-0 hover:underline bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                Start Now
              </button>
            </Link>
          </div>

          <div className="w-full md:w-2/5 py-6 text-center ">
            <img
              className="w-full md:w-4/5 z-50"
              src={require('../../../../assets/bookLover.svg')}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPages;
