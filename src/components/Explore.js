import React, { useEffect, useContext, useState } from "react";
import tweetContext from "../context/tweets/TweetContext";
import FollowListCard from "./FollowListCard";

function Explore() {
  const context = useContext(tweetContext);
  const { getAllUsers, users, setUsers, loggedUserInfo, getMyDetails } =
    context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMyDetails();
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllUsers();
    } else {
      console.log("No users Found");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div
        className="my-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>All Users</h1>
      </div>
      <div className="row my-5">
        {users
          .filter((user) => {
            return user._id !== loggedUserInfo._id;
          })
          .filter((user) => {
            if (
              loggedUserInfo &&
              loggedUserInfo.following &&
              loggedUserInfo.following.findIndex(
                (flwUser) => flwUser === user._id
              ) !== -1
            ) {
              return false;
            }
            return true;
          })
          .map((user) => {
            return (
              <FollowListCard
                key={user._id}
                user={user}
                // updateUser={updateUser}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Explore;
