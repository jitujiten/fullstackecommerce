import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DiscountPrice } from "../../../../../app/constants";
import { BallTriangle } from "react-loader-spinner";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedinUserOrders,
  selectStatus,
} from "../../../authSlice";

function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectLoggedinUserOrders);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? (
        <div className="flex items-center justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#600AFF"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          {orders && orders.length > 0 ? (
            orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="mx-auto rounded-2xl mt-5	py-3 bg-white max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                  <h1 className="text-left mt-4 text-xl md:text-4xl font-extrabold tracking-tight leading-none text-gray-800 font-serif">
                    Order #{order.id}
                  </h1>
                  <h1 className="text-left mt-1 text-lg md:text-2xl font-normal  md:font-extrabold  tracking-tight leading-none text-red-600 font-serif ">
                    Order status :{order.status}
                  </h1>
                  <h1 className="text-left mt-1 text-lg md:text-xl font-normal  md:font-extrabold  tracking-tight leading-none text-green-600 font-serif ">
                    Date Of Order :
                    {new Date(order.dateOfOrder).toLocaleDateString()}
                  </h1>
                  <p className="text-left mt-1 text-lg md:text-sm font-normal  md:font-extrabold  tracking-tight leading-none text-green-400 font-serif ">
                    Time Of Order :{" "}
                    {new Date(order.dateOfOrder).toLocaleTimeString()}
                  </p>

                  <div className=" border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {order.items.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.product.thumbnail}
                                alt={product.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 font-serif">
                                  <h3>
                                    <a href={product.product.id}>
                                      {product.product.title}
                                    </a>
                                    <p className="text-left	 mt-1 text-sm text-gray-500">
                                      {product.product.brand}
                                    </p>
                                  </h3>
                                  <p className="ml-4 text-xl">
                                    ${DiscountPrice(product.product)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label className="text-left	inline px-2  text-lg font-medium leading-6 text-gray-900 font-serif">
                                    Qty:{product.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base my-2 font-medium text-gray-900 font-serif">
                      <p>Subtotal</p>
                      <p className="text-2xl">${order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base my-2 font-medium text-gray-900 font-serif">
                      <p>Total items in cart</p>
                      <p className="text-2xl">{order.totalItems} items</p>
                    </div>
                    <p className="text-left mt-0.5 text-sm text-gray-500">
                      Shipping address:
                    </p>
                    <div className="flex justify-between gap-x-6  px-4 py-4 m-4  -ml-1 border border-2 rounded-lg border-black-600">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-left text-sm font-semibold leading-6 text-gray-900">
                            Name: {order.selectAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectAddress.street}
                          </p>
                          <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectAddress.state}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {order.selectAddress.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          pinCode: {order.selectAddress.pinCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center  text-3xl mt-8 text-gray-500 p-20">
              No orders found.
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserOrders;
