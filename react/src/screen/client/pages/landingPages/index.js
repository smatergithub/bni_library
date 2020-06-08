import React from 'react';

function LandingPages(props) {
  let { history } = props;
  return (
    <React.Fragment>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-3xl font-bold leading-tight">E-Library </h1>
            <h1 className="text-3xl font-bold leading-tight">BNI Corporate University</h1>
            <p className="leading-normal text-2xl mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,{' '}
            </p>

            <button
              className="mx-auto lg:mx-0 hover:underline bg-gray-800 text-white  rounded-full my-6 py-2 px-10 shadow-lg"
              onClick={() => history.push('/auth/register')}
            >
              Start Now
            </button>
          </div>

          <div className="w-full md:w-3/5 py-6 text-center">
            <img
              className="w-full md:w-4/5 z-50"
              src="https://raw.githubusercontent.com/tailwindtoolbox/Landing-Page/master/hero.png"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPages;
