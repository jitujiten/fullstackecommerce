import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditProductAsync,
  addProductAsync,
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectBrands,
  selectCategory,
  selectedProduct,
} from "../../product/ProductSlice";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

// {
//     "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//     ]
//   },

const ProductForm = () => {
  const dispatch = useDispatch();
  const brandData = useSelector(selectBrands);
  const categorydata = useSelector(selectCategory);
  const selectedProductIS = useSelector(selectedProduct);
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }else{
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch, setValue]);

  useEffect(() => {
    if (selectedProductIS && params.id) {
      setValue("title", selectedProductIS.title);
      setValue("description", selectedProductIS.description);
      setValue("price", selectedProductIS.price);
      setValue("discountPercentage", selectedProductIS.discountPercentage);
      setValue("stock", selectedProductIS.stock);
      setValue("brand", selectedProductIS.brand);
      setValue("category", selectedProductIS.category);
      setValue("thumbnail", selectedProductIS.thumbnail);
      setValue("image1", selectedProductIS.images[0]);
      setValue("image2", selectedProductIS.images[1]);
      setValue("image3", selectedProductIS.images[2]);
      setValue("image4", selectedProductIS.images[3]);
    }
  }, [selectedProductIS,params.id, setValue]);


  return (
    <form
      className="bg-white p-6 rounded-md"
      onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.image4,
        ];
        product.rating = 0;
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];
        delete product["image4"];
        if (params.id) {
          dispatch(
            EditProductAsync({
              ...product,
              id: params.id,
              rating: selectedProductIS.rating || 0,
            })
          );
        } else {
          dispatch(addProductAsync(product));
        }

        reset();
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {params.id?`Edit`:`Add`} Product Form
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("title", {
                      required: "Product Name field is required",
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Description :
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description  field is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="text-left mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about Product.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="brand"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Brand :
              </label>
              <div className="mt-2 text-left">
                <select
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("brand", {
                    required: "Brand  field is required",
                  })}
                >
                  <option value="">---Choose One Brand----</option>
                  {brandData.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="category"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Category :
              </label>
              <div className="mt-2 text-left">
                <select
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("category", {
                    required: "category  field is required",
                  })}
                >
                  <option value="">---Choose One category----</option>
                  {categorydata.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Price :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price  field is required",
                      min: 1,
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "Discount Percentage  field is required",
                      min: 1,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Stock :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "stock  field is required",
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail  field is required",
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image1"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1 :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image1", {
                      required: "image1  field is required",
                    })}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image2"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2 :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image2", {
                      required: "image2 field is required",
                    })}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image3"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3 :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image3", {
                      required: "image3 field is required",
                    })}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image4"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Image 4 :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image4", {
                      required: "image4 field is required",
                    })}
                    id="image4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/admin"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
