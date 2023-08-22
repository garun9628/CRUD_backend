import React, { useState } from "react";
import TweetContext from "./TweetContext";

const TweetState = (props) => {
  const host = "http://localhost:5000";
  const initialTweets = [];
  const usersArr = [];

  const [tweets, setTweets] = useState(initialTweets);
  const [users, setUsers] = useState(usersArr);
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);

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

  // get my details
  const getMyDetails = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoggedUserInfo(json);
  };

  // Get all users
  const getAllUsers = async () => {
    // Api call
    const response = await fetch(`${host}/api/auth/getallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUsers(json);
  };

  // Add a tweet
  const addTweet = async (title, tag) => {
    // Api call
    const response = await fetch(`${host}/api/tweets/addtweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, tag }),
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

  const editTweet = async (id, title, tag) => {
    // Api call
    await fetch(`${host}/api/tweets/updatetweet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, tag }),
    });

    // Logic to edit in client

    const newTweets = JSON.parse(JSON.stringify(tweets)); // ye karna jaroori hai warna front-end me reflect nahi hoga but backend me humara tweet update ho jayega.

    for (let index = 0; index < newTweets.length; index++) {
      let element = newTweets[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        break;
      }
    }
    setTweets(newTweets);
  };

  // if user follow other user then update the follower array field;

  const updateFollow = async (id, following) => {
    // API call
    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ following }),
    });
    const json = await response.json();
    setLoggedUserInfo(json);
  };

  return (
    <TweetContext.Provider
      value={{
        tweets,
        users,
        loggedUserInfo,
        setLoggedUserInfo,
        setTweets,
        addTweet,
        deleteTweet,
        getAllTweets,
        editTweet,
        getAllUsers,
        getMyDetails,
        updateFollow,
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
};

export default TweetState;
