import React from "react";
import { Rating, Box } from "@mui/material";

const StarRating = ({ value }) => {
  return (
    <>
      <Rating name="read-only" value={value} readOnly />
    </>
  );
};

export default StarRating;