import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordAsync, selectpasswordReset } from "../authSlice";
import PageNotFound from "../../../pages/404";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectpasswordReset);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  return (
    <>
      {token && email ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/oneStore.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter your reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(resetPasswordAsync({ ...data, token, email }));
              })}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: " password field is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters \n 
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                        - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors?.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="ConfirmPassword"
                    {...register("ConfirmPassword", {
                      required: "ConfirmPassword field is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="ConfirmPassword"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.ConfirmPassword && (
                    <p className="text-red-500">
                      {errors?.ConfirmPassword.message}
                    </p>
                  )}
                  {passwordReset && (
                    <p className="text-green-500">
                      Password successfully Reset
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
       <PageNotFound/>
      )}
    </>
  );
}
