import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BallTriangle } from "react-loader-spinner";
import {
  selectLoggedinUser,
  selectStatus,
  updateUserAsync,
} from "../../../authSlice";
import { useAlert } from "react-alert";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const [showAddressForm, setshowAddressForm] = useState(false);
  const status = useSelector(selectStatus);
  const alert = useAlert();
  const [edit, setEdit] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [userName, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const editHandler = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync({ user: newUser, alert }));
    setselectedEditIndex(-1);
  };

  const removeHandler = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync({ user: newUser, alert }));
  };

  const handleEditForm = (index) => {
    setselectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const addAddressForm = (address) => {
    if (address) {
      const newUser = { ...user, addresses: [...user.addresses, address] };
      dispatch(updateUserAsync({ user: newUser, alert }));
    }
    setselectedEditIndex(-1);
    setshowAddressForm(false);
  };

  async function ConvertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  }

  const handleEditClick = () => {
    setEdit(!edit);
    setName(user?.name || "");
    setSelectedFile(user?.UserProfile || null);
  };

  const FormchangeHandler = (e) => {
    const { id, files, value } = e.target;
    if (id === "fileInput") {
      const file = files[0];
      setSelectedFile(file);
      ConvertToBase64(file)
        .then((url) => {
          setFileData(url);
          alert.success("file uploaded successfully press save button to apply");
        })
        .catch((error) => {
          alert.error("Error occurred while converting to base64");
        });
    } else if (id === "name") {
      setName(value);
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (fileData && userName) {
      const newUser = { ...user, name: userName, ProfileUrl: fileData };
      dispatch(updateUserAsync({ user: newUser, alert }));
    } else {
      alert.error("profile image or name output missing ..Try again");
    }
  };

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
        <div className="mx-auto rounded-2xl mt-5	py-3	 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto rounded-2xl mt-5	py-3	 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-8 p-10">
              <div className="lg:col-span-4 ">
                {user?.ProfileUrl && (
                  <img
                    src={user?.ProfileUrl}
                    alt="ProfilePic"
                    className="w-64 h-64 block rounded-full"
                  />
                )}
                {!user?.ProfileUrl && (
                  <UserCircleIcon
                    className="w-64 h-64 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <h1 className="text-left mt-4 text-4xl font-extrabold tracking-tight leading-none text-gray-800 font-serif">
                  Name:{user?.name ? user.name : "New User"}
                </h1>
                <h1 className="text-left mt-4 text-lg md:text-2xl font-normal  md:font-extrabold  tracking-tight leading-none text-red-600 font-serif ">
                  Email address:{user?.email}
                </h1>
                {user?.role === "admin" && (
                  <h3 className="text-left mt-4 text-xl font-extrabold tracking-tight leading-none text-blue-600 font-serif">
                    role:{user?.role}
                  </h3>
                )}
              </div>
              <div className="lg:col-span-4   text-right ">
                <div className="flex justify-end -mr-3 mt-1">
                  <span onClick={handleEditClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7 text-blue-800 cursor-pointer sm:mt-5 md:mt-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                </div>

                <div>
                  {edit && (
                    <form onSubmit={SubmitHandler}>
                      <label
                        htmlFor="photo"
                        className="text-left block text-sm font-medium leading-6 text-gray-900  font-mono"
                      >
                        Upload Profile Picture
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <label
                          htmlFor="fileInput"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                        >
                          Change
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          className="invisible w-0 h-0"
                          onChange={FormchangeHandler}
                          accept="image/*"
                        />
                      </div>
                      {selectedFile && (
                        <p className="text-left mt-2 text-sm text-gray-500">
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                      <div className=" flex flex-col text-left">
                        <label htmlFor="name" className="mt-5 font-mono">
                          Enter Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={userName}
                          className="mt-5 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={FormchangeHandler}
                        />
                      </div>
                      <div className="mt-5 text-left">
                        <button
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-start mt-5 mb-6">
              <button
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  setshowAddressForm(true);
                  setselectedEditIndex(-1);
                }}
              >
                Add New Address
              </button>
            </div>
            {showAddressForm && (
              <form
                className="bg-white px-7 py-3 rounded-2xl"
                noValidate
                onSubmit={handleSubmit((data) => {
                  addAddressForm(data);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="text-left block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name field is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="text-left block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email field is required",
                              pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "Email is not valid",
                              },
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="text-left block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone field is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street field is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city field is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state field is required",
                            })}
                            id="state"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode field is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={(e) => {
                        setshowAddressForm(false);
                      }}
                      type="button"
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            )}

            <p className="text-left mt-0.5 text-sm text-gray-500">
              Your addresses:
            </p>

            {user.addresses.map((address, index) => {
              return (
                <div key={index}>
                  {selectedEditIndex === index ? (
                    <form
                      className="bg-white px-7 py-3 rounded-2xl"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        editHandler(data, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="name"
                                className="text-left block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "Name field is required",
                                  })}
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="text-left block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "Email field is required",
                                    pattern: {
                                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                      message: "Email is not valid",
                                    },
                                  })}
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="text-left block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "phone field is required",
                                  })}
                                  type="tel"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street field is required",
                                  })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city field is required",
                                  })}
                                  id="city"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state field is required",
                                  })}
                                  id="state"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", {
                                    required: "pinCode field is required",
                                  })}
                                  id="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={(e) => {
                              setselectedEditIndex(-1);
                            }}
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}
                  <div className="flex justify-between gap-x-6  px-4 py-4 m-4  -ml-1 border border-2 rounded-lg border-black-600">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-left text-sm font-semibold leading-6 text-gray-900">
                          {address?.name}
                        </p>
                        <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                          {address?.street}
                        </p>
                        <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                          {address?.state}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-center">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address?.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address?.pinCode}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                      <span
                        onClick={(e) => {
                          handleEditForm(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-7 h-7 text-blue-800 cursor-pointer "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="mt-2"
                        onClick={(e) => {
                          removeHandler(e, index);
                        }}
                      >
                        <TrashIcon className="w-6 h-6 text-red-600 " />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
