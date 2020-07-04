import React from 'react';
import Card from '../component/card';
function Wishlist() {
  return (
    <React.Fragment>
      <div className="bg-gray-300 uppercase text-gray-900 text-base font-semibold py-4 pl-6">
        Wishlist
      </div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        <Card type="wishlist" />
      </div>
    </React.Fragment>
  );
}
export default Wishlist;
