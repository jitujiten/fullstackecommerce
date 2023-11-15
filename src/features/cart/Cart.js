import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  selectCartStatus,
  selectItems,
  selectcartLoader,
  updateCartAsync,
} from "./cartSlice";

import { Link, Navigate } from "react-router-dom";
import { DiscountPrice } from "../../app/constants";
import { BallTriangle } from "react-loader-spinner";
import Modal from "../common/Modal";
import { CurrencyDollarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAlert } from "react-alert";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openModal, setopenModal] = useState(null);
  const products = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoader = useSelector(selectcartLoader);
  const alert = useAlert();

  const TotalAmount = products.reduce((ammount, item) => {
    return DiscountPrice(item.product) * item.quantity + ammount;
  }, 0);
  const TotalItems = products.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const removeHandler = (id) => {
    dispatch(deleteCartItemAsync({id:id,alert}));
  };

  return (
    <>
      {!products.length && cartLoader && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      <div className="mx-auto rounded-2xl mt-5	py-3	 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-cyan-900">
          Cart
        </h1>
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
          <span>
            <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
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
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.product.id}>
                                {product.product.title}
                              </a>
                              <p className="text-left	 mt-1 text-sm text-gray-500">
                                {product.product.brand}
                              </p>
                            </h3>
                            <p className="ml-4">
                              ${DiscountPrice(product.product)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="text-left	inline px-2  text-lg font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              className="border border-2 rounded-lg border-indigo-600"
                              onChange={(e) => {
                                handleQuantity(e, product);
                              }}
                              value={product.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <h3 className="inline"> {product.quantity}</h3>
                          </div>

                          <div className="flex">
                            <Modal
                              title={`Delete cart Item ${product.title}`}
                              message={`Are you sure you want to delete? ${product.title}`}
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              showModal={openModal === product.id}
                              cancelAction={(e) => setopenModal(null)}
                              dangerAction={(e) => {
                                removeHandler(product.id);
                              }}
                            />

                            <button
                              type="button"
                              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                              onClick={(e) => setopenModal(product.id)}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {TotalAmount}</p>
              </div>
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Total items in cart</p>
                <p>{TotalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </span>
        )}
      </div>
    </>
  );
}
