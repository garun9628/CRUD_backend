import React from "react";
import AddNote from "./AddTweet.js";
import Tweets from "./Tweets.js";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <AddNote showAlert={showAlert} />
      <Tweets showAlert={showAlert} />
    </>
  );
};

export default Home;
