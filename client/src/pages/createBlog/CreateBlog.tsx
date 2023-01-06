import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { ICreateBlogProps } from "../../utils/TypeScript";
import CardHoriz from "./../../components/CardHoriz";
import CreateForm from "./../../components/CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getCategory } from "../../slices/categorySlice";
import { startLoading, stopLoading } from "../../slices/globalSlice";
import Quill from "../../components/Quill";

const CreateBlog = () => {
  const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  const dispatch = useDispatch<AppDispatch>();

  const category = useSelector((state: RootState) => state.category);

  const [blog, setBlog] = useState<ICreateBlogProps>(initialState);
  const [body, setBody] = useState<string>("");

  return (
    <Layout>
      <div className="my-4 create_blog">
        <h1>Create Blog</h1>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Create</h5>
            <CreateForm blog={blog} setBlog={setBlog} />
          </div>
          <div className="col-md-6">
            <h5>Preview</h5>
            <CardHoriz blog={blog} />
          </div>
        </div>
        <Quill setBody={setBody} />
      </div>
    </Layout>
  );
};

export default CreateBlog;
