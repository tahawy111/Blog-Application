import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
