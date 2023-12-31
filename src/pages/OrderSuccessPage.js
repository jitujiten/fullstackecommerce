import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedinUser,
} from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";

export default function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div className="w-full md:w-screen h-screen md:h-screen flex flex-col">
        <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
          <img
            src="https://github.com/jitujiten/ecommerceBackend/assets/120164938/5ebaecd4-bea3-4f43-897b-4f31e06867bd"
            alt="OneStore Logo"
            className="w-32 h-32 block"
          />
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              Order Successfully Placed
            </p>
            <h1 className="mt-4 text-xl md:text-5xl font-bold tracking-tight text-gray-900 ">
              Order Number #{params?.id}
            </h1>
            <p className="mt-6 text-base  leading-7 text-gray-600">
              You Can Check your order in My Account My Orders
            </p>
            <p className="mt-3 text-lg leading-7 text-green-600">
              A order receipt send to your registered email address
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
