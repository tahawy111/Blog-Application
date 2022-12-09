import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";
import { useDispatch } from "react-redux";
import { googleLogin } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    dispatch(googleLogin(id_token)).then(() => {
      navigate("/");
    });
  };

  const onFailure = (err: any) => {
    console.log(err);
  };
  return (
    <div>
      <GoogleLogin
        client_id={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={false}
      />
    </div>
  );
};

export default SocialLogin;
