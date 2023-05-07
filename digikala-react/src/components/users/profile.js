import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearNotification,
  globalSucces,
} from "../../store/reducers/notifications";

import { Loader } from "../../utils/tools";
import Profile_Form from "./profile-form";
import Profile_Password from "./profile-password";

import { signout } from "../../store/actions/users";

const Profile = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signmeout = () => {
    dispatch(globalSucces("با موفقیت خارج شدید"));
    dispatch(signout(dispatch));
    navigate("/");
  };

  return (
    <div className="profile__container">
      <div className="profile__title">
        <p>تنظیمات حساب کاربری</p>
        <div onClick={signmeout} className="btn-signin">
          <svg className="svg-icon">
            <use xlinkHref="/svg-icons.svg#icon-exit"></use>
          </svg>
          <div>خروج</div>
        </div>
      </div>
      {users.loading ? (
        <Loader />
      ) : (
        <>
          <Profile_Form user={users.data} />
          <Profile_Password />
        </>
      )}
    </div>
  );
};

export default Profile;
