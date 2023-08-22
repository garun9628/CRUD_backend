import React, { useEffect, useContext } from "react";
import tweetContext from "../context/tweets/TweetContext";
const FollowListCard = (props) => {
  const { user, updateUser } = props;
  const context = useContext(tweetContext);
  const { loggedUserInfo, getMyDetails, setLoggedUserInfo, updateFollow } =
    context;

  const handleFollowClick = () => {
    loggedUserInfo.following.push(user);
    // updateUser(loggedUserInfo);
    console.log(loggedUserInfo);
    updateFollow(loggedUserInfo._id, loggedUserInfo.following);
  };

  return (
    <div className="col-md-7 m-auto my-3">
      <div
        className="card"
        style={{
          boxShadow: "5px 10px 18px #8888",
          background: "content-box",
        }}
      >
        <div className="card-body d-flex justify-content-between">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-subtitle mb-2 text-muted">{user.name}</h5>
          </div>
          <div>
            <button onClick={handleFollowClick}>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowListCard;
