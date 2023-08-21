import React, { useContext, useState } from "react";
// import tweetContext from "../context/tweets/TweetContext";
import tweetContext from "../context/tweets/TweetContext";

const AddTweet = (props) => {
  const context = useContext(tweetContext);
  const { addTweet } = context;
  const [tweet, setTweet] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault(); // isse page reload nahi hoga
    addTweet(tweet.title, tweet.description, tweet.tag);
    setTweet({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setTweet({ ...tweet, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "-25px" }}>
      <div
        className="my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>Add a Tweet</h1>
      </div>

      <form>
        <div
          style={{
            border: "0.5px solid",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "100px",
            borderColor: "darkgreen",
            boxShadow: "5px 10px 18px #8888",
          }}
        >
          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="title"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={tweet.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={tweet.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="tag"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={tweet.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "35px",
              marginBottom: "30px",
            }}
          >
            <button
              disabled={tweet.title.length < 3 || tweet.description.length < 5}
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Add Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTweet;
