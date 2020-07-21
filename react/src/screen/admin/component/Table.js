import React from 'react';


const Table = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentLimit, setCurrentLimit] = React.useState(props.limit)



  const onPaginationUpdate = () => {
    const { onPaginationUpdated } = props;

    if (onPaginationUpdated) {
      onPaginationUpdated({
        page: currentPage,
        limit: currentLimit,
      });
    }
  };


  const left = () => {
    if (currentPage > 1) {
      let count = currentPage - 1
      setCurrentPage(count);
      onPaginationUpdate();
    }
  }

  const right = () => {
    const { source: { data, totalPage } } = props;
    if (currentPage === totalPage) {
      return
    }
    if (data.length) {
      setCurrentPage(currentPage + 1)
      onPaginationUpdate()
    }
  }



  const {
    columns,
    isLoading,
    source: { data, count, totalPage, dataCurrentPage }
  } = props;

  return (
    <div className="bg-white overflow-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((column, index) => {
              return (
                <React.Fragment key={index}>
                  <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">{column.displayName}</th>
                </React.Fragment>
              )
            })}
          </tr>

        </thead>
        <tbody className="text-gray-700">
          {isLoading ? null : data.map((item, index) => {
            return (
              <tr key={index}
                className={index % 2 === 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-300'}>
                {columns.map((column, innerIndex) => {
                  return (
                    <React.Fragment key={innerIndex}>
                      {column.name === "actions" ? <td className="w-1/6 text-left py-3 px-4">{column.customRender(item)}</td> : column.customRender ? <td className="w-1/6 text-left py-3 px-4">{column.customRender(item)}</td> : <td className="w-1/6 text-left py-3 px-4">{item[column.name]}</td>}
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}

        </tbody>
      </table>
      <div className="flex justify-center bg-gray-300 mt-10">
        <nav className="relative z-0 inline-flex shadow-sm">
          <div
            onClick={left}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                clipRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            href="#"
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700  transition ease-in-out duration-150"
          >
            {currentPage} of {totalPage}
          </div>

          <div
            onClick={right}
            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                clipRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  )
}


export default Table;
