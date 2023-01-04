import React from "react";
import Layout from "../../components/Layout";

const CreateBlog = () => {
  const initialState = new Map(
    Object.entries({
      user: "",
      title: "",
      content: "",
      description: "",
      thumbnail: "",
      category: "",
      createdAt: new Date().toISOString(),
    })
  );
  console.log(obj);
  return (
    <Layout>
      <h1>Create Blog</h1>
    </Layout>
  );
};

export default CreateBlog;
