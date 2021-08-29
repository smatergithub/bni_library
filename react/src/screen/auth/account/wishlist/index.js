import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NoData } from '../../../../component';
import CartUserAPI from '../../../../api/CartUserApi';
import { getMe } from '../../../../redux/action/user';
import Card from '../component/card';
import swal from 'sweetalert';

function Wishlist(props) {
  const [cart, setCart] = React.useState([]);

  function retrieve() {
    props.getMe().then((res) => {
      if (res !== undefined) {
        CartUserAPI.getList()
          .then((response) => {
            console.log('response', response);
            let data = response.data.filter((item) => item.userId === res.data.id);
            setCart(data);
          })
          .catch((err) => {});
      }
    });
  }
  React.useEffect(() => {
    retrieve();
  }, []);

  function removeWishlist(data) {
    CartUserAPI.delete(data.id)
      .then((response) => {
        swal('Message!', 'Berhasil Hapus Dari Wishlist', 'success');
        retrieve();
      })
      .catch((err) => {});
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist | Ebni</title>
      </Helmet>
      <div className=" uppercase text-gray-900 text-base font-semibold py-4 pl-6">Wishlist</div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">
        {cart.length === 0 && <NoData msg="Belum ada item wishlist !" />}
        {cart.length !== 0 &&
          cart.map((borrow, key) => {
            return (
              <div key={key}>
                {borrow.book !== null ? (
                  <>
                    <Card
                      type="wishlist"
                      data={borrow.book}
                      onDetailClick={() =>
                        props.history.push(`/order?id=${borrow.bookId}&type=book`)
                      }
                      onRemoveItem={() =>
                        removeWishlist(borrow, borrow.type === 'BorrowBook' ? 'book' : 'ebook')
                      }
                    />
                    <div
                      className="bg-gray-600 w-full"
                      style={{
                        height: 1,
                      }}
                    ></div>
                  </>
                ) : borrow.ebook !== null ? (
                  <>
                    <Card
                      type="wishlist"
                      data={borrow.ebook}
                      onDetailClick={() =>
                        props.history.push(`/order?id=${borrow.ebookId}&type=ebook`)
                      }
                      onRemoveItem={() => removeWishlist(borrow)}
                    />
                    <div
                      className="bg-gray-600 w-full"
                      style={{
                        height: 1,
                      }}
                    ></div>
                  </>
                ) : null}
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}
let mapStateToProps = (state) => {
  return {
    profile: state.users.profile,
  };
};
export default connect(mapStateToProps, { getMe })(withRouter(Wishlist));
