import React, { useState } from "react";

function Header() {
  let [showHeaderMenu, setShowHeaderMenu] = useState(false)
  return (
    <>
      <header class="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
        <div class="w-1/2"></div>
        <div class="relative w-1/2 flex justify-end">
          <button onClick={() => setShowHeaderMenu(!showHeaderMenu)} class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
          </button>
          <button class="h-full w-full fixed inset-0 cursor-default"></button>
          <div hidden={!showHeaderMenu} class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Account</a>
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Support</a>
            <a href="#" class="block px-4 py-2 account-link hover:text-white">Sign Out</a>
          </div>
        </div>
      </header>

    </>
  )
}
export default Header
