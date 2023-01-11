import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { IBlogs, ICategory } from "../../utils/TypeScript";
import { getBlogsByCategoryId } from "../../slices/blogSlice";
import CardVert from "../../components/CardVert";
import "./blogsByCat.css";

const BlogsByCategory = () => {
  const slug = useParams()?.category;
  const { categories } = useSelector((state: RootState) => state.category);
  const { blogsByCat } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (!categories) return;
    const category: ICategory = categories.find(
      (item: ICategory) => item.name === slug
    );
    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;
    dispatch(getBlogsByCategoryId(categoryId));
  }, [categoryId, slug, dispatch]);

  return (
    <Layout>
      <div className="blogs_category">
        <div className="show_blogs">
          {blogsByCat?.blogs
            ? blogsByCat?.blogs.map((blog: IBlogs) => (
                <CardVert key={blog._id} blog={blog} />
              ))
            : "Loading..."}
        </div>
      </div>
    </Layout>
  );
};

export default BlogsByCategory;
