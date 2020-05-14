import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    params: 'dashboard'
  },
  {
    path: '/admin/books',
    name: 'Daftar Buku',
    icon: 'fas fa-table',
    params: 'books'
  },
  {
    path: '/admin/ebooks',
    name: 'Daftar Ebook',
    icon: 'fas fa-table',
    params: 'ebooks'
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    icon: 'fas fa-align-left',
    params: 'analytics'
  },
]

function Sidebar({ url, createNewBook }) {

  let [selectedMenu, setSelectedMenu] = useState(url)

  return (
    <div class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div class="p-6">
        <a class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
        <button onClick={() => createNewBook()} class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <i class="fas fa-plus mr-3"></i> Buku baru
            </button>
      </div>
      <nav class="text-white text-base font-semibold pt-3" >
        {
          routes.map(rt => {
            return (
              <Link
                to={`${rt.path}`}

                onClick={() => setSelectedMenu(rt.params)}
              >
                <div class={selectedMenu === rt.params ? 'flex items-center active-nav-link text-white py-4 pl-6 nav-item' : 'flex items-center  text-white py-4 pl-6 nav-item'}>
                  <i class={`${rt.icon} mr-3`}></i>
                  {rt.name}
                </div>
              </Link>
            )
          })
        }
      </nav>

    </div>



  )
}
export default Sidebar
