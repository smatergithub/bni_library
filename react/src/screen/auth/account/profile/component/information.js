import React from 'react';

function Information({ user, changePages }) {
  function logout() {
    localStorage.clear();
    window.location.replace('/');
  }
  if (user === null) return null;
  return (
    <div class="bg-white rounded-lg shadow-lg pl-10 relative">
      <div class="px-4 py-8 flex">
        <div class="h-24 w-24 rounded-full ">
          <img
            src="https://images.unsplash.com/photo-1521310192545-4ac7951413f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"
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
          className="absolute lg:mx-0 hover:underline bg-gray-800 text-white  rounded-sm h-10 px-5"
          style={{
            right: '2em',
          }}
          onClick={() => changePages(true)}
        >
          UBAH
        </button>
        <button
          className="absolute lg:mx-0 hover:underline text-red-600  rounded-sm h-10 px-5"
          style={{
            top: '5em',
            right: '2em',
          }}
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
export default Information;
