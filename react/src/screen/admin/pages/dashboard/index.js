import React from 'react';
import TopBar from '../../component/TopBar';
import FavoriteBookAndEbookList from '../../component/FavoriteBookAndEbookList';
import { connect } from 'react-redux';
import { getDashboardSummary } from "../../../../redux/action/dashboard"

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
    props.getDashboardSummary().then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    mappingDataSourceDashboardSummary();
  }, []);

  const mockEbook = [
    {
      title: 'Data science for beginner',
      author: 'James bond',
    },
    {
      title: 'Competitive Programer',
      author: 'Grennady',
    },
    {
      title: 'Top Coder hack',
      author: 'Grennady',
    },
    {
      title: 'Web Development using Deno land',
      author: 'Grennady',
    },
    {
      title: 'Competitive Programer',
      author: 'Grennady',
    },
  ];

  if (loading) return null;

  const { dashboardSummary } = props;

  const dataSourceBook = dashboardSummary.ratingBook === undefined ? null : dashboardSummary.ratingBook.map(item => {
    return {
      title: item.book.judul,
      tahunTerbit: item.book.tahunTerbit,
      pengarang: item.book.pengarang,
      rating: item.totalRating
    }
  })



  return (
    <div className="bg-gray-100 font-family-karla flex">
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>
            <div className="flex flex-wrap">
              {loading ? null :
                <React.Fragment>
                  <TopBar title={"Buku"} value={dashboardSummary.bookCount} icon={"fas fa-chart-pie"} description={"Total Buku"} />
                  <TopBar title={"Ebook"} value={dashboardSummary.ebookCount} icon={"fas fa-percent"} description={"Total Ebook"} />
                  <TopBar title={"Pengguna"} value={dashboardSummary.userCount} icon={"fas fa-users"} description={"Total Pengguna"} /></React.Fragment>}
            </div>

            <FavoriteBookAndEbookList
              isLoading={loading}
              goToBookDetail={goToBookDetail}
              goToEBookDetail={goToEBookDetail}
              mockBookFavorite={dataSourceBook}
              mockEbook={dashboardSummary.ebook}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    dashboardSummary: state.dashboard.dashboardSummary,
  };
};

export default connect(mapStateToProps, { getDashboardSummary })(Dashboard);
