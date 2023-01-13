import { useEffect } from "react";
import "../pages/profile/profile.css";
import { getSomeUser, startLoading, stopLoading } from "../slices/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import Layout from "./Layout";
import NotFound from "./../pages/NotFound";
import { IUserData } from "./../utils/TypeScript";

interface Props {
  id: string;
}

const OtherInfo: React.FC<Props> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.global.someUser);
  useEffect(() => {
    dispatch(startLoading());
    dispatch(getSomeUser(id)).then(() => {
      dispatch(stopLoading());
    });
  }, [id, dispatch]);

  if (!user) return <h1>Loading...</h1>;

  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={user?.avatar} alt="avatar" />
      </div>

      <h5 className="text-uppercase text-danger">{user?.role}</h5>

      <div>
        Name: <span className="text-info">{user?.name}</span>
      </div>

      <div>Email / Phone number</div>
      <span className="text-info">{user?.account}</span>

      <div>
        Join Date:{" "}
        <span style={{ color: "#ffc107" }}>
          {new Date(user?.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default OtherInfo;
