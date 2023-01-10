import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const BlogsByCategory = () => {
  const { category } = useParams();
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();

  const [categoryId, setCategoryId] = useState();

  useEffect(() => {});

  return (
    <Layout>
      <h1>{category}</h1>
    </Layout>
  );
};

export default BlogsByCategory;
