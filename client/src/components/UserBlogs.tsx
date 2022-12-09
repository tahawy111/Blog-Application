import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
const UserBlogs = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const user = auth.user.user;
  return <h1>UserBlogs</h1>;
};

export default UserBlogs;
