import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { InputChange } from "../utils/TypeScript";
import ModalInstance from "./Modal";

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
    account: user?.account,
    password: "",
  });
  console.log(changeAccountData);
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
  function EmailModal() {
    return (
      <ModalInstance
        handleClose={handleEmailModalClose}
        handleShow={handleEmailModalShow}
        show={showEmailModal}
      >
        <div className="form-group">
          <label htmlFor="password">Enter Your Passowrd</label>
          <input
            type={typePass2 ? "text" : "password"}
            name="password"
            className="form-control"
            id="password"
            value={changeAccountData.password}
            onChange={handleChangeAccount}
          />
          <small
            style={{ cursor: "pointer" }}
            onClick={() => setTypePass2(!typePass2)}
          >
            {typePass2 ? "Hide" : "Show"}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="account-to-be">Enter New Account (Email)</label>
          <input
            type="text"
            name="account"
            className="form-control"
            id="account-to-be"
            value={changeAccountData.account}
            onChange={handleChangeAccount}
          />
        </div>
      </ModalInstance>
    );
  }

  return (
    <form className="profile_info">
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
          disabled
        />
        {user.type !== "login" && (
          <small
            style={{ cursor: "pointer" }}
            onClick={handleEmailModalShow}
            className="text-danger"
          >
            Change Account
          </small>
        )}
        {user.type !== "login" && EmailModal()}
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
        />
        <small
          style={{ cursor: "pointer" }}
          onClick={() => setTypePass(!typePass)}
        >
          {typePass ? "Hide" : "Show"}
        </small>
      </div>
      <button className="btn btn-info w-100" type="submit">
        Update
      </button>
    </form>
  );
};

export default UserInfo;
