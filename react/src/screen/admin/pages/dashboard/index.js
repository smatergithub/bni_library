import React from 'react'
import Table from '../../component/Table'
function Dashboard() {

  return (
    <div class="bg-gray-100 font-family-karla flex">
      <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <div class="w-full overflow-x-hidden border-t flex flex-col">
          <main class="w-full flex-grow p-6">
            <h1 class="text-3xl text-black pb-6">Dashboard</h1>

            <div class="flex flex-wrap mt-6">
              <div class="w-full lg:w-1/2 pr-0 lg:pr-2">
                <p class="text-xl pb-3 flex items-center">
                  <i class="fas fa-plus mr-3"></i> Populer
                        </p>
                <div class="p-6 bg-white">
                  <canvas id="chartOne" width="400" height="200"></canvas>
                </div>
              </div>
              <div class="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
                <p class="text-xl pb-3 flex items-center">
                  <i class="fas fa-check mr-3"></i> Pengunjung
                        </p>
                <div class="p-6 bg-white">
                  <canvas id="chartTwo" width="400" height="200"></canvas>
                </div>
              </div>
            </div>

            <div class="w-full mt-12">
              <p class="text-xl pb-3 flex items-center">
                <i class="fas fa-list mr-3"></i> Daftar Buku
                    </p>
              <Table />
            </div>

          </main>


        </div>

      </div>
    </div>
  )
}

export default Dashboard
