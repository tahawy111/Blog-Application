import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { IBlogs, ICategory } from "../../utils/TypeScript";
import { getBlogsByCategoryId } from "../../slices/blogSlice";
import CardVert from "../../components/CardVert";
import "./blogsByCat.css";
import { Pagination } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import getQuery from "./../../utils/getQuery";

const BlogsByCategory = () => {
  const history = window.location;
  const qSearch: any = getQuery(history.search);
  console.log(+qSearch.page);
  console.log(history);
  const slug = useParams()?.category;
  const { categories } = useSelector((state: RootState) => state.category);
  const { blogsByCat }: any = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(+qSearch.page || 1);
  const navigate = useNavigate();
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
    navigate(`?page=${page}`);
    dispatch(getBlogsByCategoryId({ catId: categoryId, page }));
  }, [categoryId, page, slug, dispatch, qSearch.page, navigate]);

  return (
    <Layout>
      <div className="blogs_category">
        <div className="show_blogs">
          {blogsByCat?.blogs.map((blog: IBlogs) => (
            <CardVert key={blog._id} blog={blog} />
          ))}
        </div>
        <Pagination
          defaultPage={page}
          count={blogsByCat?.total}
          variant="outlined"
          shape="rounded"
          color="primary"
          style={{ margin: "20px 0" }}
          onChange={(e, value) => setPage(value)}
          showFirstButton
          showLastButton
        />
      </div>
    </Layout>
  );
};

export default BlogsByCategory;
