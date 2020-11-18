import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NoData } from '../../../../component';
import { removeBookWishlist, removeEbookWishlist } from '../../../../redux/action/wishlist';
import Card from '../component/card';
import books from 'redux/reducer/modules/books';

function Wishlist(props) {
  let wishlist = props.books.concat(props.ebooks);

  function removeWishlist(data, isBook) {
    if (isBook) {
      props.removeBookWishlist(data);
    } else {
      props.removeEbookWishlist(data);
    }
  }
  function onOrderItem(data, isBook) {
    if (isBook === 'book') {
      // return <Redirect to={`/order?id=${data.id}&type=book`} />;
      props.history.push(`/order?id=${data.id}&type=book`);
    } else {
      // return <Redirect to={`/order?id=${data.id}&type=ebook`} />;
      props.history.push(`/order?id=${data.id}&type=ebook`);
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist | Ebni</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">Wishlist</div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        {wishlist.length === 0 && <NoData msg="Belum ada item wishlist !" />}
        {wishlist.length !== 0 &&
          wishlist.map((borrow, key) => {
            return (
              <div key={key}>
                <Card
                  type="wishlist"
                  data={borrow}
                  onDetailClick={() => onOrderItem(borrow, borrow.sourceLink ? 'ebook' : 'book')}
                  onRemoveItem={() => removeWishlist(borrow, borrow.sourceLink ? 'ebook' : 'book')}
                />
                <div
                  className="bg-gray-600 w-full"
                  style={{
                    height: 1,
                  }}
                ></div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}
let mapStateToProps = state => {
  return {
    books: state.wishlist.books,
    ebooks: state.wishlist.ebooks,
  };
};
export default connect(mapStateToProps, { removeEbookWishlist, removeBookWishlist })(
  withRouter(Wishlist)
);
