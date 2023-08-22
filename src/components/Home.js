import React from "react";
import AddTweet from "./AddTweet.js";
import FollowersTweets from "./FollowersTweets";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <AddTweet showAlert={showAlert} />
      <FollowersTweets />
    </>
  );
};

export default Home;
