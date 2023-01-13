import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../store";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import UserInfo from "../../components/UserInfo";
import UserBlogs from "../../components/UserBlogs";
import { useParams } from "react-router-dom";
import OtherInfo from "./../../components/OtherInfo";

const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const slug: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  return (
    <Layout>
      <Row className="my-3">
        <Col md={5} className="mb-3">
          {auth?.user?.user !== null && auth?.user?.user?._id !== slug?.id ? (
            <OtherInfo id={slug?.id} />
          ) : (
            <UserInfo />
          )}
        </Col>
        <Col md={7} className="mb-3">
          <UserBlogs />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
