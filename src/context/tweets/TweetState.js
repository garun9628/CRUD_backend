import React, { useState } from "react";
import TweetContext from "./TweetContext";

const TweetState = (props) => {
  const host = "http://localhost:5000";
  const initialTweets = [];

  const [tweets, setTweets] = useState(initialTweets);

  // Get all tweets
  const getAllTweets = async () => {
    // Api call
    const response = await fetch(`${host}/api/tweets/fetchalltweets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setTweets(json);
  };

  // Add a tweet
  const addTweet = async (title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/tweets/addtweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const tweet = await response.json();
    setTweets(tweets.concat(tweet));
  };

  // Delete a tweet
  const deleteTweet = async (id) => {
    // Api call
    await fetch(`${host}/api/tweets/deletetweet/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    getAllTweets();
  };

  const editTweet = async (id, title, description, tag) => {
    // Api call
    await fetch(`${host}/api/tweets/updatetweet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to edit in client

    const newTweets = JSON.parse(JSON.stringify(tweets)); // ye karna jaroori hai warna front-end me reflect nahi hoga but backend me humara tweet update ho jayega.

    for (let index = 0; index < newTweets.length; index++) {
      let element = newTweets[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setTweets(newTweets);
  };

  return (
    <TweetContext.Provider
      value={{
        tweets,
        setTweets,
        addTweet,
        deleteTweet,
        getAllTweets,
        editTweet,
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
};

export default TweetState;
