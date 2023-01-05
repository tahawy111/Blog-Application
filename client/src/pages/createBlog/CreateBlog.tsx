import { useState } from "react";
import Layout from "../../components/Layout";
import { ICreateBlogProps } from "../../utils/TypeScript";
import CardHoriz from "./../../components/CardHoriz";
import CreateForm from "./../../components/CreateForm";

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

  const [blog, setBlog] = useState<ICreateBlogProps>(initialState);

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
            <CardHoriz />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
