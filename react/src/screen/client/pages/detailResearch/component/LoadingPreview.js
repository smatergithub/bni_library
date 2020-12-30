import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const LoadingPreview = () => (
  <div>
    <Loader active inline="centered">
      Loading
    </Loader>
  </div>
);

export default LoadingPreview;
