import React from 'react';

function Bar(props) {
  return (
    <div className="w-full lg:w-6/12 xl:w-4/12 px-1">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">{props.title}</h5>
              <span className="font-semibold text-xl text-gray-800">{props.value}</span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-600">
                <i className={props.icon} />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {/* change className green to update icon color  */}

            <span className="whitespace-no-wrap">{props.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Bar;
