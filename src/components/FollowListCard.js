import React, { useEffect, useContext } from "react";
import tweetContext from "../context/tweets/TweetContext";

const FollowListCard = (props) => {
  const { user } = props;
  const context = useContext(tweetContext);
  const { loggedUserInfo, users, setUsers, setLoggedUserInfo, updateFollow } =
    context;
  const handleFollowClick = () => {
    const newLoggedUserInfo = { ...loggedUserInfo };
    const updatedLoggedUserInfo = {
      ...loggedUserInfo,
      following: [...loggedUserInfo.user.following, user._id],
    };

    loggedUserInfo.user.following.find((userStr) => {
      if (userStr === user._id) {
        return;
      }
    });

    setLoggedUserInfo({
      ...loggedUserInfo,
      following: [...loggedUserInfo.following, user._id],
    });

    const newUsers = users
      .filter((user) => {
        return user._id !== loggedUserInfo._id;
      })
      .filter((user) => {
        if (
          updatedLoggedUserInfo &&
          updatedLoggedUserInfo.following &&
          updatedLoggedUserInfo.following.findIndex(
            (flwUser) => flwUser === user._id
          ) !== -1
        ) {
          return false;
        }
        return true;
      });
    setUsers(
      newUsers.map((contextUsr) => {
        if (contextUsr._id === loggedUserInfo._id) {
          return {
            ...loggedUserInfo,
            following: [...loggedUserInfo.following, user._id],
          };
        } else {
          return contextUsr;
        }
      })
    );
    // backend me update karne ke liye
    newLoggedUserInfo.following.push(user._id);
    updateFollow(newLoggedUserInfo._id, newLoggedUserInfo.following);
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
