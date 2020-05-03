import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Detail(props) {
  React.useEffect(() => {
    if (props.name == null) {
      return window.location.replace('/');
    }
  }, []);
  const { name } = props;
  if (name == null) return null;
  return (
    <div className="container mx-auto">
      <ul className="list-disc">
        <li>Name: {`${name.name.first}`}</li>
        <li>Email: {`${name.email}`}</li>
        <li>Phone: {`${name.phone}`}</li>
      </ul>
      <button
        type="button"
        onClick={() => window.location.replace('/')}
        className="   transition duration-100
                      ease-in-out
                      bg-transparent
                      hover:bg-blue-500
                      text-blue-700
                      font-semibold
                      hover:text-white
                      py-2
                      px-4
                      border
                      border-blue-500
                      hover:border-transparent
                      rounded"
      >
        Back to summary
      </button>
    </div>
  );
}
const mapState = state => {
  return {
    name: state.nameReducer.name,
  };
};
Detail.propTypes = {
  name: PropTypes.any.isRequired,
};
export default connect(mapState)(Detail);
