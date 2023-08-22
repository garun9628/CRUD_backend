import React from "react";
import Tweets from "./Tweets.js";
import AddTweet from "./AddTweet.js";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <AddTweet showAlert={showAlert} />
      <Tweets showAlert={showAlert} />
    </>
  );
};

export default Home;
