import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../component/Table';
import TopBar from '../../component/TopBar';
import FavoriteBookAndEbookList from '../../component/FavoriteBookAndEbookList';

function Dashboard(props) {
  const { history } = props;
  function goToBookDetail() {
    history.push('/admin/books');
  }
  function goToEBookDetail() {
    history.push('/admin/ebooks');
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
            <TopBar />
            <FavoriteBookAndEbookList
              goToBookDetail={goToBookDetail}
              goToEBookDetail={goToEBookDetail}
            />
            <div className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3" /> Daftar Buku
              </p>
              <Table />
              <Table />
              <Table />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
};
export default Dashboard;
