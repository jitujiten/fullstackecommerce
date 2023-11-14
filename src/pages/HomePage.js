import { useSelector } from "react-redux";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import { selectAllProducts } from "../features/product/ProductSlice";
import Carosul from "../features/common/Carosul";
import { Link } from "react-router-dom";

function HomePage() {
  const products = useSelector(selectAllProducts);

  return (
    <div>
      <Navbar>
        <Carosul />
        <main className="flex min-h-screen flex-col items-center justify-between px-24 ">
          <section className="">
            <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 text-gray-800">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
                  Best Fashion Collection
                </h1>
                <p className="max-w-2xl mb-6  font-thin text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-gray-600">
                  One Store...A Place where you can find Everything
                </p>
                <Link to="/all-products">
                  <button
                    type="button"
                    className="mt-1.5 inline-block bg-gray-900 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md hover:scale-125 hover:bg-gray-800 transition delay-150 duration-300 ease-in-out"
                  >
                    Explore Shop Collection
                  </button>
                </Link>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1300&h=1800&q=80"
                  className="rounded-lg"
                  alt="Explore Shop Collection"
                />
              </div>
            </div>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                  <div className="max-w-md mx-auto text-center lg:text-left">
                    <div>
                      <h2 className="text-xl font-bold  sm:text-3xl text-gray-800">
                        Summer Sale Collection
                      </h2>
                    </div>
                    <Link to="/product-detail/6551b61bf8bdd93ef851023a">
                      <button className="mt-1.5 inline-block bg-gray-900 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-lg">
                        Shop ALL
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-2 lg:py-8">
                  <ul className="grid grid-cols-2 gap-4">
                    <Link to="/product-detail/6551b61bf8bdd93ef851023a">
                      <li className="cursor-pointer">
                        <div>
                          <img
                            src="https://i.dummyjson.com/data/products/61/1.jpg"
                            alt="Sale Product Item"
                            className="object-cover w-full rounded-xl aspect-square"
                          />
                        </div>
                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900">
                            Leather Straps Wristwatch
                          </h3>
                          <p className="mt-1 text-sm text-gray-800">
                            $120{" "}
                            <span className="text-red-700">{`(-$7.14%) Off`}</span>
                          </p>
                        </div>
                      </li>
                    </Link>
                    <Link to="/product-detail/6551b61bf8bdd93ef8510245">
                      <li className="cursor-pointer">
                        <div>
                          <img
                            src="https://i.dummyjson.com/data/products/72/4.jpg"
                            alt="Sale Product Item"
                            className="object-cover w-full rounded-xl aspect-square"
                          />
                        </div>
                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900">
                            Handbag For Girls
                          </h3>
                          <p className="mt-1 text-sm text-gray-800">
                            $23{" "}
                            <span className="text-red-700">{`(-$17.5%) Off`}</span>
                          </p>
                        </div>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 sm:text-3xl">
                  WHAT WE HAVE
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-4">
                <li>
                  <div className="relative block group">
                    <img
                      src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">KIDS</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative block group">
                    <img
                      src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">WOMEN</h3>
                    </div>
                  </div>
                </li>

                <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                  <div className="relative block group">
                    <img
                      src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">MEN</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative block group">
                    <img
                      src="https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">WOMEN</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative block group">
                    <img
                      src="https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&h=1500&q=80"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">MEN</h3>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}

export default HomePage;
