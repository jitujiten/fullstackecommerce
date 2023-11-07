import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TotalOrdersCount,
  UpdateOneOrderAsync,
  allOrders,
  fetchAllOrderAsync,
  selectOrdersStatus,
} from "../../order/orderSlice";
import { DiscountPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../common/Pagination";
import { BallTriangle } from "react-loader-spinner";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const Orders = useSelector(allOrders);
  const TotalOrders = useSelector(TotalOrdersCount);
  const status = useSelector(selectOrdersStatus);
  const [page, setPage] = useState(1);
  const [EditableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setsort] = useState({});

  const handlePage = (page) => {
    setPage(page);
  };

  const handleEdit = (order) => {
    if (EditableOrderId === order.id) {
      setEditableOrderId(-1);
    } else {
      setEditableOrderId(order.id);
    }
  };

  const handleShow = (order) => {};

  const handleUpdate = (e, order) => {
    const UpdatedOrder = { ...order, status: e.target.value };
    dispatch(UpdateOneOrderAsync(UpdatedOrder));
    setEditableOrderId(-1);
  };

  const handleSort = (e, sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setsort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

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
        <div className="w-full overflow-x-auto bg-red-300">
          <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className=" w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left"
                        onClick={(e) =>
                          handleSort(e, {
                            sort: "id",
                            order: sort._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Order#{" "}
                        {sort._order === "desc" ? (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th
                        className="py-3 px-6 text-center"
                        onClick={(e) =>
                          handleSort(e, {
                            sort: "totalAmount",
                            order: sort._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Total Amount{" "}
                        {sort._order === "desc" ? (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        )}
                      </th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {Orders.map((order) => {
                      return (
                        <tr
                          key={order.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  />
                                </svg>
                              </div>
                              <h1 className="text-3xl xl:text-10xl font-abhaya-libre text-green-900 font-bold leading-none">
                                {order.id}
                              </h1>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            {order.items.map((item, index) => (
                              <div
                                className="flex items-center py-2  p-1 my-1 rounded-lg"
                                key={item.index}
                              >
                                <div className="mr-2">
                                  <img
                                    className="w-8 h-8 rounded-lg"
                                    src={item.thumbnail}
                                  />
                                </div>
                                <span>
                                  <span className="text-sm xl:text-10xl font-abhaya-libre text-brown-600 font-bold leading-none py-2  whitespace-nowrap">
                                    {item.title}
                                  </span>
                                  <h1 className="text-sm xl:text-10xl font-abhaya-libre text-brown-600 font-bold leading-none my-2">
                                    Qty:-{item.quantity}
                                  </h1>
                                  <h1 className="text-sm xl:text-10xl font-abhaya-libre text-green-900 font-bold leading-none">
                                    $ {DiscountPrice(item)}
                                  </h1>
                                </span>
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="text-xl xl:text-10xl font-abhaya-libre text-black-900  font-extrabold leading-none">
                              ${order.totalAmount}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div>
                              <div>
                                <strong>{order.selectAddress.name}</strong>
                              </div>
                              <div>{order.selectAddress.city}</div>
                              <div>{order.selectAddress.street}</div>
                              <div>{order.selectAddress.state}</div>
                              <div>{order.selectAddress.pinCode}</div>
                            </div>
                          </td>
                          <td className="w-1/6 py-3 px-6 text-center">
                            {order.id === EditableOrderId ? (
                              <select
                                value={order.status}
                                className=" py-2 px-6 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300 text-left"
                                onChange={(e) => handleUpdate(e, order)}
                              >
                                <option value="pending">pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`py-1 px-3 rounded-full text-xs ${
                                  order.status === "pending"
                                    ? "bg-purple-200 text-purple-600"
                                    : order.status === "dispatched"
                                    ? "bg-orange-200 text-orange-600"
                                    : order.status === "delivered"
                                    ? "bg-green-200 text-green-600"
                                    : order.status === "cancelled"
                                    ? "bg-red-200 text-red-600"
                                    : ""
                                }`}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-6 transform hover:text-purple-500 hover:scale-110">
                                <EyeIcon
                                  className="w-6 h-6"
                                  onClick={() => {
                                    handleShow(order);
                                  }}
                                />
                              </div>
                              <div className="w-4 mr-6 transform hover:text-purple-500 hover:scale-110">
                                <PencilIcon
                                  className="w-6 h-6"
                                  onClick={() => {
                                    handleEdit(order);
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalItems={TotalOrders}
          />
        </div>
      )}
    </>
  );
};

export default AdminOrders;
