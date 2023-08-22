import React, { useContext, useEffect, useState } from "react";
import tweetContext from "../context/tweets/TweetContext";
import MyTweetItem from "./MyTweetItem";

const FollowersTweets = () => {
  const url = "http://localhost:5000";
  const host = process.env.REACT_APP_API_URL || "default-api-url";
  const context = useContext(tweetContext);
  const { users, getAllUsers } = context;

  //   const followersTweetsArr = [];
  const [followersTweets, setFollowersTweets] = useState([]);

  //   const followers = loggedUserInfo?.following;
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    users.map(async (user) => {
      const response = await fetch(
        `${host}/api/tweets/fetchFollowerstweets/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setFollowersTweets([...followersTweets, ...json]);
    });
  }, [users]);
  return (
    <>
      {followersTweets.map((tweet) => {
        return <MyTweetItem tweet={tweet} />;
      })}
    </>
  );
};

export default FollowersTweets;
