import React from 'react';
import TopBar from '../../component/TopBar';
import FavoriteBookAndEbookList from '../../component/FavoriteBookAndEbookList';
import { connect } from 'react-redux';
import { getDashboardSummary } from '../../../../redux/action/dashboard';

const Dashboard = (props) => {
  const [loading, setLoading] = React.useState(false);

  const { history } = props;
  function goToBookDetail() {
    history.push('/admin/books');
  }
  function goToEBookDetail() {
    history.push('/admin/ebooks');
  }

  const mappingDataSourceDashboardSummary = () => {
    setLoading(true);
    props
      .getDashboardSummary()
      .then((res) => {
        if (res) {
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    mappingDataSourceDashboardSummary();
  }, []);

  const { dashboardSummary } = props;

  const dataSourceBook =
    dashboardSummary.ratingBook === undefined
      ? null
      : dashboardSummary.ratingBook.map((item) => {
          return {
            title: item.book ? item.book.judul : '',
            tahunTerbit: item.book ? item.book.tahunTerbit : '',
            pengarang: item.book ? item.book.pengarang : '',
            rating: item.book ? item.totalRating : '',
          };
        });

  const dataSourceEbook =
    dashboardSummary.ratingEbook === undefined
      ? null
      : dashboardSummary.ratingEbook.map((item) => {
          return {
            title: item.ebook ? item.ebook.judul : '',
            tahunTerbit: item.ebook ? item.ebook.tahunTerbit : '',
            pengarang: item.ebook ? item.ebook.pengarang : '',
            rating: item.ebook ? item.totalRating : '',
          };
        });

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
            <div className="flex flex-wrap">
              {loading ? null : (
                <React.Fragment>
                  <TopBar
                    title={'Buku'}
                    value={dashboardSummary.bookCount}
                    icon={'fas fa-book'}
                    description={'Total Buku'}
                  />
                  <TopBar
                    title={'Ebook'}
                    value={dashboardSummary.ebookCount}
                    icon={'fas fa-book-open'}
                    description={'Total Ebook'}
                  />
                  <TopBar
                    title={'Pengguna'}
                    value={dashboardSummary.userCount}
                    icon={'fas fa-users'}
                    description={'Total Pengguna'}
                  />
                </React.Fragment>
              )}
            </div>

            <FavoriteBookAndEbookList
              isLoading={loading}
              goToBookDetail={goToBookDetail}
              goToEBookDetail={goToEBookDetail}
              mockBookFavorite={dataSourceBook}
              mockEbook={dataSourceEbook}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    dashboardSummary: state.dashboard.dashboardSummary,
  };
};

export default connect(mapStateToProps, { getDashboardSummary })(Dashboard);
