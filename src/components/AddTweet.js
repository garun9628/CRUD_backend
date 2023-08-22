import React, { useContext, useState, useRef } from "react";
import tweetContext from "../context/tweets/TweetContext";
import { useNavigate } from "react-router-dom";

const AddTweet = (props) => {
  const context = useContext(tweetContext);
  const { addTweet } = context;
  const refModal = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();
  const [tweet, setTweet] = useState({
    title: "",
    tag: "",
  });

  const handlePosts = (currTweet) => {
    refModal.current.click();
    setTweet({
      id: currTweet._id,
      etitle: currTweet.title,
      etag: currTweet.tag,
    });
  };

  const handleMyTweetsClick = (e) => {
    navigate("/mytweets");
  };

  const onChange = (e) => {
    setTweet({ ...tweet, [e.target.name]: e.target.value });
  };

  const handleAddClick = (e) => {
    addTweet(tweet.etitle, tweet.etag);
    refClose.current.click();
    props.showAlert("Added Successfully", "success");
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-between">
        <button onClick={handlePosts} type="button" className="btn btn-primary">
          Post
        </button>
        <button
          type="button"
          onClick={handleMyTweetsClick}
          className="btn btn-secondary"
        >
          My Tweets
        </button>
      </div>

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
                Post Tweet
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
                disabled={tweet?.etitle?.length < 3}
                type="button"
                className="btn btn-primary"
                onClick={handleAddClick}
              >
                Post Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTweet;
