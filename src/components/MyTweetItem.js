import React from "react";
// import tweetContext from "../context/tweets/TweetContext";

const MyTweetItem = (props) => {
  // const context = useContext(tweetContext);
  // const { deleteTweet } = context;
  console.log("Hello");
  const { tweet } = props;
  console.log(tweet);

  // const handleDelete = () => {
  //   deleteTweet(tweet._id);
  //   showAlert("Tweet deleted successfully", "success");
  // };

  // const handleEditClick = () => {
  //   updateTweet(tweet);
  // };

  return (
    <div className="col-md-7 m-auto my-3">
      <div
        className="card"
        style={{
          boxShadow: "5px 10px 18px #8888",
          background: "content-box",
        }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-subtitle mb-2 text-muted">{tweet.title}</h5>
            {/* <div>
              <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
              <i className="far fa-edit mx-2" onClick={handleEditClick}></i>
            </div> */}
          </div>
          <div>
            <h6 className="card-title">{tweet.tag}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTweetItem;
