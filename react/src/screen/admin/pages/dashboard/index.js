import React from 'react'
import Table from '../../component/Table'
import TopBar from '../../component/TopBar'
import FavoriteBookAndEbookList from '../../component/FavoriteBookAndEbookList'
function Dashboard(props) {
  let { history } = props
  function goToBookDetail() {
    history.push('/admin/books')
  }
  function goToEBookDetail() {
    history.push('/admin/ebooks')
  }
  return (
    <div class="bg-gray-100 font-family-karla flex">
      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <div class="w-full overflow-x-hidden border-t flex flex-col">
          <main class="w-full flex-grow p-6">
            <h1 class="text-3xl text-black pb-6">Dashboard</h1>
            <TopBar />
            <FavoriteBookAndEbookList goToBookDetail={goToBookDetail} goToEBookDetail={goToEBookDetail} />
            <div class="w-full mt-12">
              <p class="text-xl pb-3 flex items-center">
                <i class="fas fa-list mr-3"></i> Daftar Buku
                    </p>
              <Table />
              <Table />
              <Table />
            </div>

          </main>


        </div>

      </div>
    </div>
  )
}

export default Dashboard
