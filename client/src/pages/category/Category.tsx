import React, { useEffect, useState } from "react";
import { IFormEvent, InputChange } from "../../utils/TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { createCategory, getCategory } from "../../slices/categorySlice";
import { startLoading, stopLoading } from "../../slices/globalSlice";
import Layout from "../../components/Layout";
import "./category.css";

export interface IUserLogin {
  account: string;
  password?: string;
}
const Category = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(startLoading());
    dispatch(getCategory()).then(() => {
      dispatch(stopLoading());
    });
  }, [dispatch]);

  const { categories } = useSelector((state: RootState) => state.category);

  const submitHandler = (e: IFormEvent) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(createCategory(name)).then(() => {
      dispatch(stopLoading());
      setName("");
    });
  };
  return (
    <Layout>
      <div className="category">
        <form onSubmit={submitHandler}>
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
          {categories !== null &&
            categories.map((category: any) => (
              <div className="category_row" key={category._id}>
                <p className="m-0 text-capitalize" key={category._id}>
                  {category.name}
                </p>

                <div>
                  <i className="fas fa-edit mx-2" />
                  <i className="fas fa-trash-alt" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
