import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync, selectItems } from "../cart/cartSlice";
import { useAlert } from "react-alert";
import { checkAuthAsync, selectLoggedinUser } from "../auth/authSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const items = useSelector(selectItems);
  const Mainuser = useSelector(selectLoggedinUser);
  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useLocation();

  const Carthandler = () => {
    if (!items.length) {
      alert.error("No item found in Cart! Add one..");
    }
  };

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-">
                      <Link to="/">
                        <img
                          className="h-10 w-10"
                          src="/oneStore.png"
                          alt="oneStore"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                          to="/"
                          className={`rounded-md px-3 py-2 text-sm font-medium  text-white  ${
                            location.pathname === "/"
                              ? "active bg-gray-900"
                              : "hover:bg-gray-700 hover:text-gray-300"
                          }`}
                        >
                          Home
                        </Link>
                        <Link
                          to="/all-products"
                          className={`rounded-md px-3 py-2 text-sm font-medium  text-white  ${
                            location.pathname === "/all-products"
                              ? "active bg-gray-900"
                              : "hover:bg-gray-700 hover:text-gray-300"
                          }`}
                        >
                          Products
                        </Link>
                        {Mainuser?.role === "admin" && (
                          <Link
                            to="/admin"
                            className={`rounded-md px-3 py-2 text-sm font-medium  text-white  ${
                              location.pathname === "/admin"
                                ? "active bg-gray-900"
                                : "hover:bg-gray-700 hover:text-gray-300"
                            }`}
                          >
                            Admin
                          </Link>
                        )}
                        {Mainuser?.role === "admin" && (
                          <Link
                            to="/admin/orders"
                            className={`rounded-md px-3 py-2 text-sm font-medium  text-white  ${
                              location.pathname === "/admin/orders"
                                ? "active bg-gray-900"
                                : "hover:bg-gray-700 hover:text-gray-300"
                            }`}
                          >
                            Orders
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {Mainuser && (
                        <Link to="/my-cart" onClick={Carthandler}>
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <ShoppingCartIcon
                              className="h-6 w-6 "
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                      )}
                      {Mainuser && items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 z-10">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {Mainuser && Mainuser?.ProfileUrl && (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={Mainuser?.ProfileUrl}
                                alt=""
                              />
                            )}
                            {!Mainuser?.ProfileUrl && (
                              <UserCircleIcon
                                className="h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {!Mainuser && (
                              <Link
                                to="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                login
                              </Link>
                            )}
                            {Mainuser && (
                              <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                My Profile
                              </Link>
                            )}
                            {Mainuser && (
                              <Link
                                to="/my-orders"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                My Orders
                              </Link>
                            )}
                            {Mainuser && (
                              <Link
                                to="/logout"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    {Mainuser && (
                      <Link to="/my-cart" onClick={Carthandler}>
                        <button
                          type="button"
                          className="relative mt-3 -mr-1 ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6  "
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                    )}
                    {Mainuser && items.length > 0 && (
                      <span className="inline-flex items-center rounded-md mb-7 mr-4 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 z-10">
                        {items.length}
                      </span>
                    )}

                    {!Mainuser && (
                      <span className="inline-flex items-center rounded-md mb-7 mr-4 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 z-10 invisible">
                        0
                      </span>
                    )}

                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <Link to="/">
                    <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      Home
                    </div>
                  </Link>
                  <Link to="/all-products">
                    <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      Products
                    </div>
                  </Link>
                  {Mainuser?.role === "admin" && (
                    <Link to="/admin">
                      <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        Admin
                      </div>
                    </Link>
                  )}
                  {Mainuser?.role === "admin" && (
                    <Link to="/admin/orders">
                      <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        Orders
                      </div>
                    </Link>
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex justify-center	  px-6">
                    <div className="flex-shrink-0">
                      {Mainuser && Mainuser?.ProfileUrl && (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={Mainuser?.ProfileUrl}
                          alt=""
                        />
                      )}
                      {!Mainuser?.ProfileUrl && (
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {Mainuser && (
                      <div className="ml-3 mt-3">
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {Mainuser?.email}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {!Mainuser && (
                      <Link to="/login">
                        <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          login
                        </div>
                      </Link>
                    )}
                    {Mainuser && (
                      <Link to="/profile">
                        <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          My Profile
                        </div>
                      </Link>
                    )}
                    {Mainuser && (
                      <Link to="/my-orders">
                        <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          My Orders
                        </div>
                      </Link>
                    )}
                    {Mainuser && (
                      <Link to="/logout">
                        <div className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          Sign out
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-8xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
