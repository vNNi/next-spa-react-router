import { useParams } from 'react-router-dom';

import React from "react";

const Product = () => {
  const id = useParams().id;
  return <>id: {id}</>;
};

export default Product;
