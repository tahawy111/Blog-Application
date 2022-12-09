import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../store";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import UserInfo from "../../components/UserInfo";
import UserBlogs from "../../components/UserBlogs";

const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const user = auth.user.user;
  return (
    <Layout>
      {/* <div className="row my-3 ">
        <div className="col-md-5 mb-3">{user?._id}</div>
        <div className="row md-7"></div>
      </div> */}
      <Row className="my-3">
        <Col md={5} className="mb-3">
          <UserInfo />
        </Col>
        <Col md={7} className="mb-3">
          <UserBlogs />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
