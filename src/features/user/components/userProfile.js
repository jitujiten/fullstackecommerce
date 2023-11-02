import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedinUser } from "../../auth/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);

  const editHandler = (e, id) => {};

  const removeHandler = (e, id) => {};

  return (
    <div className="mx-auto rounded-2xl mt-5	py-3	 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-left ml-3 text-4xl font-bold tracking-tight text-gray-900">
        Name:{user?.name ? user.name : "New User"}
      </h1>
      <h3 className="text-left ml-3 m-2 text-xl font-bold tracking-tight text-red-400">
        Email address:{user.email}
      </h3>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <p className="text-left mt-0.5 text-sm text-gray-500">
          Your addresses:
        </p>
        {user.addresses.map((address, index) => {
          return (
            <div
              key={index}
              className="flex justify-between gap-x-6  px-4 py-4 m-4  -ml-1 border border-2 rounded-lg border-black-600"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-left text-sm font-semibold leading-6 text-gray-900">
                    {address.name}
                  </p>
                  <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.street}
                  </p>
                  <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.state}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-center">
                <p className="text-sm leading-6 text-gray-900">
                  Phone: {address.phone}
                </p>
                <p className="text-sm leading-6 text-gray-500">
                  {address.pinCode}
                </p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    editHandler(address.id);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    removeHandler(address.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
