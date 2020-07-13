import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          position: 'absolute',
          zIndex: 112001,
          justifyContent: 'center',
          backgroundColor: 'black',
          alignItems: 'center',
        }}
      >
        hello
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
};
export default LoadingIndicator;
