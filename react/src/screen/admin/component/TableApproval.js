import React, { Component } from 'react'

export default class TableApproval extends Component {
  state = {
    currentPage: this.props.page,
    currentLimit: this.props.limit
  }

  onPaginationUpdate = () => {
    const { onPaginationUpdated } = this.props;

    if (onPaginationUpdated) {
      onPaginationUpdated({
        page: this.state.currentPage,
        limit: this.state.currentLimit,
      });
    }
  };


  left = () => {
    const { currentPage } = this.state;

    if (currentPage > 1) {
      this.setState(
        {
          currentPage: currentPage - 1,
        },
        () => {
          this.onPaginationUpdate();
        }
      );
    }
  };

  right = () => {
    const { currentPage } = this.state;
    const {
      source: { data, totalPage },
    } = this.props;

    if (currentPage === totalPage) {
      return;
    }

    if (data.length) {
      this.setState(
        {
          currentPage: currentPage + 1,
        },
        () => {
          this.onPaginationUpdate();
        }
      );
    }
  };

  render() {
    const {
      columns,
      isLoading,
      source: { data, totalPage }
    } = this.props;
    const { currentLimit, currentPage } = this.state;
    return (
      <React.Fragment>
        <div className="block w-full ">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  return (
                    <React.Fragment key={index}>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">{column.displayName}</th>
                    </React.Fragment>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {isLoading ? null : data.map((item, index) => {
                return (
                  <tr key={index}
                  >
                    {columns.map((column, innerIndex) => {
                      return (
                        <React.Fragment key={innerIndex}>
                          {column.name === "actions" ? <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">{column.customRender(item)}</th> : column.customRender ? <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">{column.customRender(item)}</th> : <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">{item[column.name]}</th>}
                        </React.Fragment>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center bg-gray-300 mt-10">
          <nav className="relative z-0 inline-flex shadow-sm">
            <div
              onClick={this.left}
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
              onClick={this.right}
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
      </React.Fragment>
    )
  }
}
