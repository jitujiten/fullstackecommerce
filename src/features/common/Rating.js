import React from "react";

const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 p-1"
    viewBox="0 0 20 20"
    fill={filled ? "#FFD700" : "none"}
    stroke={filled ? "#FFD700" : "currentColor"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 2L12.397 8.763H19.06L13.996 13.235l1.503 7.383L10 16.308l-5.498 4.31 1.503-7.383L0.94 8.763h6.662L10 2z"
    />
  </svg>
);

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} filled />);
  }

  // Display four full stars and one blank star if rating is less than 4.5
  if (rating < 4.5) {
    stars.push(<Star key={4} filled={false} />);
  }

  return <div className="flex">{stars}</div>;
};

const Rating = ({ rating }) => (
  <div>
    <StarRating rating={rating} />
  </div>
);

export default Rating;
