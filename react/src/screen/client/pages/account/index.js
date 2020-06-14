import React from 'react';

function Accounts() {
  return (
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-20">
      <section class="bg-gray-100 py-12 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-lg shadow-lg">
            <div class="px-4 py-8 flex">
              <div class="h-24 w-24 rounded-full ">
                <img
                  src="https://images.unsplash.com/photo-1521310192545-4ac7951413f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"
                  alt=""
                  className="h-24 w-24 rounded-full"
                />
              </div>
              <div className="h-32 flex-start px-8">
                <h4 class=" text-lg tracking-wide uppercase leading-tight">Reynhard Sinaga</h4>
                <div class="text-sm text-gray-600">Staf</div>
                <div class="mt-1 text-sm text-gray-700">BNI Jakarta</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Accounts;
