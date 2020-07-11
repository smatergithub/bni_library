import React from 'react';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';
function DetailBooks() {
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <section className="py-16 lg:py-24 w-full">
        <div className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg">
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        <div class="flex  w-full">
          <div class="flex w-4/6 text-gray-700 bg-white px-20 py-10  m-2">
            <div className="w-2/5 ">
              <div className="bg-white rounded-lg  border-gray-300">
                <img
                  src={img}
                  alt=""
                  style={{
                    height: 440,
                    width: 300,
                  }}
                />
              </div>
            </div>
            <div className="w-3/5 px-5">
              <div className="text-lg font-bold">Coding Interview Javascript Interview</div>
              <div
                className="bg-gray-400 w-full mt-2"
                style={{
                  height: 1,
                }}
              ></div>
              <div className="flex mt-3 ">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-700" />
                  <i className="fas fa-star text-yellow-700" />
                  <i className="fas fa-star text-yellow-700" />
                  <i className="fas fa-star text-yellow-700" />
                  <i className="far fa-star text-yellow-700" />
                </div>
                <div> 4.48 (606,907 ratings by Goodreads)</div>
              </div>
              <div> Paperback | Indonesia</div>
              <div> By (author) Reynhard Sinaga</div>
              <div className="py-1 font-bold">Description:</div>
              <div>
                For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the
                North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead,
                the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not
                what they say. Sensitive and intelligent, she has survived for years alone in the
                marsh that she calls home, finding friends in the gulls and lessons in the sand.
                Then the time comes when she yearns to be touched and loved. When two young men from
                town become intrigued by her wild beauty, Kya opens herself to a new life - until
                the unthinkable happens.
              </div>
            </div>
          </div>
          <div class="w-2/6  bg-white px-10 py-10 m-2">
            <div className="text-lg font-bold">Book Details</div>
            <div
              className="bg-gray-400 w-full mt-2 mb-2"
              style={{
                height: 1,
              }}
            ></div>

            <div> Author : Reynhard Sinaga</div>
            <div> ISBN : 9781529105100</div>
            <div> Format : Hardback</div>
            <div> Publishers : Biru Muda</div>
            <div> Publication date : 12/12/2020</div>
            <div> Pages : 120</div>
            <div> Product dimensions : 172 x 223 x 24mm</div>
            <div> Condition : New</div>
            <button className="w-full bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
              Pesan Sekarang
            </button>
            <button className="w-full  text-gray-800  rounded-lg my-1 py-2 px-10 border border-gray-600">
              Tambah Wishlist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default DetailBooks;
