import { useState } from "react";
import Layout from "../../components/Layout";

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

  const [blog, setBlog] = useState(initialState);

  return (
    <Layout>
      <div className="my-4 create_blog">
        <h1>Create Blog</h1>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Create</h5>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
