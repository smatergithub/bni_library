import React from 'react';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80';
function Research() {
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl leading-tight font-bold mt-4">Welcome to BNI Research</h2>
              <p className="text-lg mt-4 font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="mt-2 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis risus
                massa, ac sodales felis posuere in. Curabitur euismod neque at nunc laoreet euismod
                ut eget magn Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lobortis risus massa, ac sodales felis posuere in. Curabitur euismod neque at nunc
                laoreet euismod ut eget magn
              </p>
            </div>

            <div>
              <div className="md:flex">
                <div>
                  <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h4 className="text-xl font-bold leading-tight">
                    Everything You Need Under One Roof
                  </h4>
                  <p className="mt-2 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis risus
                    massa, ac sodales felis posuere in. Curabitur euismod neque at nunc laoreet
                    euismod ut eget magn Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus lobortis risus massa, ac sodales felis posuere in. Curabitur euismod
                    neque at nunc laoreet euismod ut eget magn
                  </p>
                </div>
              </div>

              <div className="md:flex mt-8">
                <div>
                  <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h4 className="text-xl font-bold leading-tight">Our Patient-Focused Approach</h4>
                  <p className="mt-2 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis risus
                    massa, ac sodales felis posuere in. Curabitur euismod neque at nunc laoreet
                    euismod ut eget magn Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus lobortis risus massa, ac sodales felis posuere in. Curabitur euismod
                    neque at nunc laoreet euismod ut eget magn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            <div>
              <div className="bg-white rounded-lg border border-gray-300">
                <img src={img} alt="" className="h-50" />
                <div className="p-8">
                  <h4 className="text-xl font-bold mt-4">Crack Interview Question</h4>
                  <p className="mt-1">Let us show you how our experience.</p>
                  <a href="#" className="block mt-4">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-300">
                <img src={img} alt="" className="h-50" />
                <div className="p-8">
                  <h4 className="text-xl font-bold mt-4">Crack Interview Question</h4>
                  <p className="mt-1">Let us show you how our experience.</p>
                  <a href="#" className="block mt-4">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-300">
                <img src={img} alt="" className="h-50" />
                <div className="p-8">
                  <h4 className="text-xl font-bold mt-4">Crack Interview Question</h4>
                  <p className="mt-1">Let us show you how our experience.</p>
                  <a href="#" className="block mt-4">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
