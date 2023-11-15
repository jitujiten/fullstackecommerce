import React, { useState, useEffect } from "react";

const Carosul = () => {
  const [cont, setCont] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      switchSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const switchSlide = () => {
    setCont((prevCont) => {
      if (prevCont === 0) {
        return 1;
      } else if (prevCont === 1) {
        return 2;
      } else {
        return 0;
      }
    });
  };

  const sliderButton1 = () => {
    setCont(0);
  };

  const sliderButton2 = () => {
    setCont(1);
  };

  const sliderButton3 = () => {
    setCont(2);
  };

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&h=500&q=80",
      title: "Premium Brands",
      subtitle: "Shoes & jeans is here",
    },
    {
      image:
        "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&h=400&q=80",
      title: "Premium Brands",
      subtitle: "Watches  is here",
    },
    {
      image:
        "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4070&q=80",
      title: "Premium Brands",
      subtitle: "Shoes  is here",
    },
  ];

  return (
    <div className="sliderAx  w-full">
      <div className="mx-auto w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`bg-cover rounded-lg bg-center h-auto text-white py-24 px-10 object-fill ${
              cont === index ? "block" : "hidden"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="md:w-1/2">
              <p className="text-3xl font-bold"></p>
              <p className="text-3xl font-bold">{slide.title}</p>
              <p className="text-2xl mb-10 leading-none">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-12 mx-auto pb-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCont(index)}
            className={`bg-gray-200 rounded-full w-4 p-1 m-3  mt-1 ${
              cont === index ? "bg-gray-800" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carosul;
