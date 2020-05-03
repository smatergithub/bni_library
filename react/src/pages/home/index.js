import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getListNameAction, selectedNameAction } from '../../redux/action/nameAction';
import './home.css';

function Home(props) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    props.getListNameAction().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div data-testid="home__loading">Loading</div>;
  const { names } = props;
  return (
    <div data-testid="home__container" className="container mx-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {names.map((data, key) => {
            return (
              <tr key={key}>
                <td className="border px-4 py-2">{data.name.last}</td>
                <td className="border px-4 py-2">
                  <Link
                    data-testid="home_user-detail-button"
                    to={'/detail'}
                    onClick={() => props.selectedNameAction(data)}
                  >
                    <button type="button" className=".p-6 .w-12">
                      Detail
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
const mapState = state => {
  return {
    names: state.nameReducer.names,
  };
};
Home.propTypes = {
  names: PropTypes.any.isRequired,
  selectedNameAction: PropTypes.func.isRequired,
  getListNameAction: PropTypes.func.isRequired,
};
export default connect(mapState, { getListNameAction, selectedNameAction })(Home);
