import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const UserInfo = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    password: "",
    cfPassword: "",
    avatar: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const user = auth.user.user;
  useEffect(() => {
    // console.log(URL.createObjectURL(user?.avatar));
  });
  return (
    <form className="profile_info">
      <div className="info_avatar">
        <img src={user?.avatar} alt="avatar" />

        <span>
          <i className="fas fa-camera"></i>
          <p>Change</p>
          <input type="file" accept="image/*" name="file" id="file_up" />
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="account">Account</label>
        <input type="text" className="form-control" id="account" />
      </div>
    </form>
  );
};

export default UserInfo;
