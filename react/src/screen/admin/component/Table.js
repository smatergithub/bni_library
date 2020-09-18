import React, { Component } from 'react';
let colOpt = [10, 20, 50, 100];
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.page,
      currentLimit: this.props.limit,
      showMultipleCol: false,
      totalActiveColumn: 10,
    };
  }
  componentDidUpdate() {}
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
  onSelectMultipleColumn = col => {
    this.setState({ totalActiveColumn: col }, () => {
      this.setState({ showMultipleCol: false });
    });
  };

  render() {
    console.log(this.state.showMultipleCol);
    const {
      columns,
      isLoading,
      source: { data, totalPage },
    } = this.props;
    const { currentLimit, currentPage } = this.state;
    return (
      <div className="bg-white overflow-auto">
        <div className="w-full flex justify-between items-center px-10 py-2 ">
          <div className="flex justify-center items-center text-base pt-2 relative">
            Show{' '}
            <span
              className="mx-2 bg-gray-200 px-5"
              onClick={() => this.setState({ showMultipleCol: true })}
            >
              <button className=" rounded-full overflow-hidden  border-gray-600 focus:outline-none focus:border-white">
                <span className="text-lg font-bold">{this.state.totalActiveColumn}</span>
                <span className="mt-10">
                  {this.state.showMultipleCol ? (
                    <i
                      className="fas fa-chevron-up text-xl mt-2"
                      style={{
                        marginBottom: -2,
                        marginRight: -5,
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-chevron-down text-xl mt-2"
                      style={{
                        marginBottom: -2,
                        marginLeft: 2,
                      }}
                    ></i>
                  )}
                </span>
              </button>
              {this.state.showMultipleCol && (
                <div
                  className="mt-2 py-2 w-20 bg-white rounded-lg shadow-xl absolute"
                  style={{
                    left: '3em',
                  }}
                >
                  {colOpt.map((item, key) => {
                    return (
                      <div
                        key={key}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-500 cursor-pointer hover:text-white"
                        onClick={() => {
                          this.onSelectMultipleColumn(item);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
            </span>{' '}
            entries
          </div>
          <div className="pt-2 relative  text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-5 mr-4 border-0 focus:outline-none"
            >
              <i className="fas fa-search text-xl"></i>
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((column, index) => {
                return (
                  <React.Fragment key={index}>
                    <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                      {column.displayName}
                    </th>
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {isLoading
              ? null
              : data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-300'
                      }
                    >
                      {columns.map((column, innerIndex) => {
                        return (
                          <React.Fragment key={innerIndex}>
                            {column.name === 'actions' ? (
                              <td className="w-1/6 text-left py-3 px-4">
                                {column.customRender(item)}
                              </td>
                            ) : column.customRender ? (
                              <td className="w-1/6 text-left py-3 px-4">
                                {column.customRender(item)}
                              </td>
                            ) : (
                              <td className="w-1/6 text-left py-3 px-4">{item[column.name]}</td>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
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
              {currentPage > 0 ? currentPage : 0} of {totalPage}
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
      </div>
    );
  }
}

export default Table;
