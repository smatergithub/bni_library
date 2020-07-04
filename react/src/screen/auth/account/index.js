import React from 'react';
import Sidebar from './component/Sidebar';
import Profile from './profile';
function Accounts() {
  return (
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-20">
      <section class="bg-gray-100 py-12 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <Sidebar />
          <div
            className="w-full flex flex-col h-screen overflow-y-hidden"
            style={{
              marginTop: -1,
            }}
          >
            <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
              <Profile />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Accounts;
