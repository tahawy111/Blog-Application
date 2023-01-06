import React from "react";
import { Button, Card } from "react-bootstrap";
import { ICreateBlogProps } from "../utils/TypeScript";

interface Props {
  blog: ICreateBlogProps;
}

const CardHoriz: React.FC<Props> = ({ blog }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div
          className="col-md-4"
          style={{ minHeight: "150px", maxHeight: "300px", overflow: "hidden" }}
        >
          <img
            src={
              blog.thumbnail?.preview ? blog.thumbnail?.preview : blog.thumbnail
            }
            className="img-fluid rounded-start h-100 w-100"
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.description}</p>
            <p className="card-text">
              <small className="text-muted">
                {new Date(blog.createdAt).toLocaleString("en-JM")}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHoriz;
