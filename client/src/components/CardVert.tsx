import React from "react";
import { IBlogs } from "../utils/TypeScript";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  blog: IBlogs;
}

const CardVert: React.FC<Props> = ({ blog }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={blog.thumbnail}
        alt={blog.title.slice(0, 20)}
      />
      <Card.Body>
        <Card.Title>
          <Link to={`/blog/${blog._id}`}></Link>
        </Card.Title>
        <Card.Text>{blog.description.slice(0, 100) + "..."}</Card.Text>
        <small className="text-muted">
          <Link to={`/profile/${blog.user._id}`}>By: {blog.user._id}</Link>
        </small>
        <br />
        <small className="text-muted">
          {new Date(blog.createdAt).toLocaleString("en-CA")}
        </small>
      </Card.Body>
    </Card>
  );
};

export default CardVert;
