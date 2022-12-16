import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../store";
import { InputChange, IFormEvent } from "../utils/TypeScript";
// import ModalInstance from "./Modal";
import AlertConfirm from "react-alert-confirm";
import { checkImage, imageUpload } from "../utils/imageUpload";
import { update } from "../slices/authSlice";

const UserInfo = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user.user;
  const [formData, setFormData] = useState({
    name: user?.name,
    account: user?.account,
    password: "",
    cfPassword: "",
    avatar: user?.avatar,
  });
  const [changeAccountData, setChangeAccountData] = useState({
    account: "",
    password: "",
  });
  const handleChangeAccount = (e: InputChange) => {
    const { value, name } = e.target;
    setChangeAccountData({ ...changeAccountData, [name]: value });
  };

  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleEmailModalClose = () => setShowEmailModal(false);
  const handleEmailModalShow = () => setShowEmailModal(true);

  const handleChangeInput = (e: InputChange) => {
    if (e.target.type === "file") {
      const target = e.target as HTMLInputElement;
      target?.files &&
        setFormData({
          ...formData,
          [target.name]: {
            preview: URL.createObjectURL(target?.files[0]),
            file: target?.files[0],
          },
        });
    } else {
      const { value, name } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const [typePass, setTypePass] = useState(false);
  const [typePass2, setTypePass2] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // console.log();
  });

  const handleChangeInfoSubmit = async (e: IFormEvent) => {
    e.preventDefault();
    if (
      formData.avatar ||
      formData.name ||
      formData.password ||
      formData.account
    ) {
      const [isOk] = await AlertConfirm(
        "Are you sure to change your personal info?"
      );
      if (isOk)
        if (formData.password !== formData.cfPassword)
          toast.warning("Passwords do not matches");

      let updateObj: {
        name: string;
        account: string;
        password: string;
        avatar: File;
      } = {
        name: formData.name,
        account: formData.account,
        password: formData.password || "",
        avatar: formData.avatar.file || formData.avatar,
      };
      const check = checkImage(updateObj.avatar);
      if (check !== "") return toast.warning(check);
      const photo = await imageUpload(updateObj.avatar);
      if (photo.url) updateObj.avatar = photo.url;
      dispatch(update(updateObj));
    }
  };
  // function EmailModal() {
  //   return (
  //     <ModalInstance
  //       title="Change Email"
  //       closeText="Close"
  //       submitText="Save Changes"
  //       handleClose={handleEmailModalClose}
  //       show={showEmailModal}
  //     >
  //       <div className="form-group">
  //         <label htmlFor="password">Enter Your Passowrd</label>
  //         <input
  //           type={typePass2 ? "text" : "password"}
  //           name="password"
  //           className="form-control"
  //           id="password"
  //           value={changeAccountData.password}
  //           onChange={handleChangeAccount}
  //         />
  //         <small
  //           style={{ cursor: "pointer" }}
  //           onClick={() => setTypePass2(!typePass2)}
  //         >
  //           {typePass2 ? "Hide" : "Show"}
  //         </small>
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="account-to-be">Enter New Account (Email)</label>
  //         <input
  //           type="text"
  //           name="account"
  //           className="form-control"
  //           id="account-to-be"
  //           value={changeAccountData.account}
  //           onChange={handleChangeAccount}
  //         />
  //       </div>
  //     </ModalInstance>
  //   );
  // }

  return (
    <form className="profile_info" onSubmit={handleChangeInfoSubmit}>
      <div className="info_avatar">
        <img
          src={
            formData?.avatar?.preview ? formData?.avatar?.preview : user?.avatar
          }
          alt="avatar"
        />

        <span>
          <i className="fas fa-camera"></i>
          <p>Change</p>
          <input
            type="file"
            name="avatar"
            onChange={handleChangeInput}
            accept="image/*"
            id="file_up"
          />
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          value={formData.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          name="account"
          className="form-control"
          id="account"
          value={formData.account}
          onChange={handleChangeInput}
          disabled={user.type === "login"}
        />

        {user.type === "login" && (
          <small style={{ cursor: "pointer" }} className="text-danger">
            Your Account is linked wit social auth so you can't change it
          </small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="checkPassword">Passowrd</label>
        <input
          type={typePass ? "text" : "password"}
          name="password"
          className="form-control"
          id="checkPassword"
          value={formData.password}
          onChange={handleChangeInput}
          disabled={user.type === "login"}
        />
        <small
          style={{ cursor: "pointer" }}
          onClick={() => setTypePass(!typePass)}
        >
          {typePass ? "Hide" : "Show"}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="cfPassword">Confirm Password</label>
        <input
          type={typePass ? "text" : "password"}
          className="form-control"
          id="cfPassword"
          name="cfPassword"
          value={formData.cfPassword}
          onChange={handleChangeInput}
          disabled={user.type === "login"}
        />
        <small
          style={{ cursor: "pointer" }}
          onClick={() => setTypePass(!typePass)}
        >
          {typePass ? "Hide" : "Show"}
        </small>
      </div>
      <button className="btn btn-dark w-100" type="submit">
        Update
      </button>
    </form>
  );
};

export default UserInfo;
