import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import tweetContext from "../context/tweets/TweetContext";
import MyTweetItem from "./MyTweetItem";

const MyTweets = (props) => {
  const history = useNavigate();
  const { showAlert } = props;
  const context = useContext(tweetContext);
  const { tweets, getAllTweets, editTweet } = context;
  const refModal = useRef(null);
  const refClose = useRef(null);
  const [tweet, setTweet] = useState({
    id: "",
    etitle: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllTweets();
    } else {
      history("/login");
    }

    // eslint-disable-next-line
  }, []);

  const updateTweet = (currTweet) => {
    refModal.current.click();
    setTweet({
      id: currTweet._id,
      etitle: currTweet.title,
      etag: currTweet.tag,
    });
  };

  const handleCloseClick = (e) => {
    // editTweet(tweet.id, tweet.etitle, tweet.etag);
    refClose.current.click();
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setTweet({ ...tweet, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={refModal}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Tweet
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={tweet.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={tweet.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={tweet.etitle.length < 3 || tweet.eimage.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleCloseClick}
              >
                Update Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="my-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h1>Your Tweets</h1>
        </div>
        <div className="row my-5">
          {tweets.map((tweet) => {
            return (
              <MyTweetItem
                key={tweet._id}
                updateTweet={updateTweet}
                tweet={tweet}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyTweets;
