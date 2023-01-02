import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { RootState } from "../../store";
import "./category.css";
import { IFormEvent } from "../../utils/TypeScript";
import NotFound from "../NotFound";
import { useJwt } from "react-jwt";
import { startLoading, stopLoading } from "../../slices/globalSlice";
import { createCategory } from "./../../slices/categorySlice";

export interface ICategoryCreate {
  name: string;
}
const Category = () => {
  const [name, setName] = useState<string>("");

  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { isExpired } = useJwt(auth.user?.access_token);

  const handleSubmit = (e: IFormEvent) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(createCategory({ name })).then(() => {
      dispatch(stopLoading());
      setName("");
    });
  };

  if (auth.user?.user?.role !== "admin") return <NotFound />;
  return (
    <Layout>
      <div className="category">
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>

          <div className="d-flex">
            <input
              type="text"
              name="category"
              id="category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Create</button>
          </div>
        </form>

        <div>
          {/* {categories.map((category) => ( */}
          <div className="category_row">
            <p className="m-0 text-capitalize">Category Name</p>

            <div>
              <i className="fas fa-edit mx-2" />
              <i className="fas fa-trash-alt" />
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
