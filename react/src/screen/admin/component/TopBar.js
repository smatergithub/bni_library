import React from 'react'

let mockData = [
  {
    title: 'Total Pengunjung',
    value: 1234,
    icon: 'far fa-chart-bar',
    percen: '21%',
    status: 'fas fa-arrow-up'

  },
  {
    title: 'Total Buku',
    value: 2323,
    icon: 'fas fa-chart-pie',
    percen: '21%',
    status: 'fas fa-arrow-down'

  },
  {
    title: 'Total Ebook',
    value: 2323,
    icon: 'fas fa-percent',
    percen: '21%',
    status: 'fas fa-arrow-down'

  },
  {
    title: 'Total User',
    value: 2323,
    icon: 'fas fa-users',
    percen: '21%',
    status: 'fas fa-arrow-down'

  }
]

function Bar() {
  return (
    <div className="flex flex-wrap">
      {mockData.map(item => {
        return (
          <div className="w-full lg:w-6/12 xl:w-3/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-500 uppercase font-bold text-xs">
                      {item.title}
                    </h5>
                    <span className="font-semibold text-xl text-gray-800">
                      {item.value}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                      <i className={item.icon}></i>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {/* change className green to update icon color  */}
                  <span className="text-green-500 mr-2">
                    <i className={item.status}></i> {item.percen}
                  </span>
                  <span className="whitespace-no-wrap">
                    dibanding bulan lalu
                        </span>
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Bar
