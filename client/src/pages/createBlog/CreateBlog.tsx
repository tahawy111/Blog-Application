import { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import { ICreateBlogProps, IFormEvent } from "../../utils/TypeScript";
import CardHoriz from "./../../components/CardHoriz";
import CreateForm from "./../../components/CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getCategory } from "../../slices/categorySlice";
import { startLoading, stopLoading } from "../../slices/globalSlice";
import Quill from "../../components/Quill";
import { Button } from "react-bootstrap";
import { validCreateBlog } from "./../../utils/valid";
import { toast } from "react-toastify";
import { imageUpload } from "../../utils/imageUpload";

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
  const divRef = useRef<HTMLDivElement>(null);
  const [blog, setBlog] = useState<ICreateBlogProps>(initialState);
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const content = div?.innerText as string;
    setBlog({ ...blog, content });
  }, [body]);

  const handleSubmit = async () => {
    // const div = divRef.current;
    // const content = div?.innerText as string;
    // setBlog({ ...blog, content });
    let url = "";
    const check = validCreateBlog({ ...blog });
    if (check !== "") return toast.error(check);

    if (typeof blog.thumbnail?.preview) {
      const photo = await imageUpload(blog.thumbnail?.file);
      url = photo.url;
    } else {
      url = blog.thumbnail;
    }

    let newBlog = {
      ...blog,
      thumbnail: url,
      content: body,
    };

    console.log(newBlog);

    // Dispatch
  };

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

        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
        <small>{blog.content.length}</small>

        <Button
          variant="dark"
          onClick={handleSubmit}
          className="mt-3 d-block mx-auto"
        >
          Add Post
        </Button>
      </div>
    </Layout>
  );
};

export default CreateBlog;
