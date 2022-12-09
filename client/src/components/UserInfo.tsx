import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const UserInfo = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const user = auth.user.user;
  return <h1>UserInfo</h1>;
};

export default UserInfo;
