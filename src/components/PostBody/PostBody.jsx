import React, { useState, useEffect } from "react";
import ReadMoreReact from "read-more-react";
import styles from "./PostBody.module.css";
import Loading from "./loading.gif";
import CommentBody from "../CommentBody/CommentBody";
import axios from "axios";
import { useHistory } from 'react-router-dom'

function PostBody(props) {
  const [upvoteHover, setupvoteHover] = useState(false);
  const [downvoteHover, setdownvoteHover] = useState(false);
  const [commentHover, setcommentHover] = useState(false);
  const [reshareHover, setreshareHover] = useState(false);
  const [upVoteSelected, setupVoteSelected] = useState(false);
  const [downVoteSelected, setdownVoteSelected] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [err, setErr] = useState(null);
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);
  const [post, setPost] = useState(props.post);
  const [upvotes, setUpvotes] = useState(props.post.upvotes);
  const [downvotes, setDownvotes] = useState(props.post.downvotes);

  // let {user} = props;
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    setClicked(true);
    if (comment.length === 0) {
      setErr("Please type something");
      setClicked(false);
    } else {
      setErr(null);
      props.createComment(comment, post._id).then(() => {
        setClicked(false);
        setComment("");
        getComment(1);
      });
    }
  };

  const getComment = async (flag = 0) => {
    post.comment === undefined || flag === 1
      ? await axios
          .get(
            `https://secret-castle-58335.herokuapp.com/api/posts/post/${post._id}`
          )
          .then((res) => {
            // post = res.data.post
            let selectedPost = post;
            selectedPost["comment"] = res.data.post.comment;
            setPost(selectedPost);
            if (flag === 0) {
              toggleComment();
            } else {
              setShowComments(false);
              setShowComments(true);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      : toggleComment();
  };

  const toggleComment = () => {
    setShowComments(!showComments);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const isLiked = () => {
    return post.likeUsers.includes(`${user._id}`);
  };

  const isDisLiked = () => {
    return post.dislikeUsers.includes(`${user._id}`);
  };

  const updatePost = async () => {
    await axios
      .patch(
        `https://secret-castle-58335.herokuapp.com/api/posts/${post._id}`,
        post
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userLikedThePost = () => {
    if (isLiked()) {
      setUpvotes(upvotes - 1);
      setupVoteSelected(false);
      post.likeUsers = post.likeUsers.replace(user._id, "");
      return;
    }
    post.likeUsers += user._id;
    post.upvotes += 1;
    setUpvotes(upvotes + 1);
    if (isDisLiked()) {
      if (downvotes > 0) {
        setDownvotes(downvotes - 1);
        post.downvotes -= 1;
      }
      setdownVoteSelected(false);
      post.dislikeUsers = post.dislikeUsers.replace(user._id, "");
    }
    setupVoteSelected(true);
    updatePost();
  };

  const userDislikedThePost = () => {
    if (isDisLiked()) {
      setDownvotes(downvotes - 1);
      setdownVoteSelected(false);
      post.dislikeUsers = post.dislikeUsers.replace(user._id, "");
      return;
    }
    post.dislikeUsers += user._id;
    post.downvotes += 1;
    setDownvotes(downvotes + 1);
    if (isLiked()) {
      if (upvotes > 0) {
        setUpvotes(upvotes - 1);
        post.upvotes -= 1;
      }
      setupVoteSelected(false);
      post.likeUsers = post.likeUsers.replace(user._id, "");
    }
    setdownVoteSelected(true);
    updatePost();
  };

  const handleDpClick = () => {
    history.replace('')
    history.push(`/profile/${post.creator}`)
  }

  useEffect(() => {
    if (isLiked()) {
      setupVoteSelected(true);
    }
    if (isDisLiked()) {
      setdownVoteSelected(true);
    }
    if (props.creator) {
      props.post["creatorEmail"] = props.creator.email;
      setPost(props.post);
    }
  }, []);

  let time = post.createdAt.split("T");
  time[1] = time[1].substr(0, time[1].length - 5);
  time[0] = time[0].split("-");
  time[0] = time[0][2] + "-" + time[0][1] + "-" + time[0][0];

  return (
    <div style={props.style} className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <img
            src={`https://picsum.photos/seed/${post.creatorEmail}/200/200`}
            alt="random"
            onClick={handleDpClick}
          />
        </div>
      </div>
      <div className={styles.postContainer}>
        <div>
          <p className={styles.name}>
            <b>{post.creatorName}</b>
          </p>
          <p className={styles.createdAt}>
            Created At: {time[0]}&nbsp;&nbsp;{time[1]}
          </p>
        </div>
        <div>
          <ReadMoreReact
            text={post.description}
            min={250}
            ideal={270}
            max={300}
            readMoreText={"Read More..."}
          />
        </div>
        <div className={styles.interaction}>
          <div
            className={upvoteHover ? styles.updownHover : styles.iconContainer}
            onMouseEnter={() => setupvoteHover(true)}
            onMouseLeave={() => setupvoteHover(false)}
            onClick={() => userLikedThePost()}
          >
            <div className={styles.likeBtn}>
              <div>
                <img
                  src={
                    upVoteSelected
                      ? `https://img.icons8.com/external-those-icons-fill-those-icons/24/288cfb/external-up-arrows-those-icons-fill-those-icons-2.png`
                      : `https://img.icons8.com/external-those-icons-lineal-those-icons/24/${
                          upvoteHover ? "288cfb" : "6a6a6a"
                        }/external-up-arrows-those-icons-lineal-those-icons-2.png`
                  }
                  alt="upvote"
                />
              </div>
              <div className={styles.countDiv}>
                <span className={styles.count}>{upvotes}</span>
              </div>
            </div>
          </div>
          <div
            className={
              downvoteHover ? styles.updownHover : styles.iconContainer
            }
            onMouseEnter={() => setdownvoteHover(true)}
            onMouseLeave={() => setdownvoteHover(false)}
            onClick={() => userDislikedThePost()}
          >
            <div className={styles.dislikeBtn}>
              <div>
                <img
                  src={
                    downVoteSelected
                      ? `https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/288cfb/external-down-arrows-kmg-design-glyph-kmg-design-1.png`
                      : `https://img.icons8.com/external-those-icons-lineal-those-icons/24/${
                          downvoteHover ? "288cfb" : "6a6a6a"
                        }/external-down-arrows-those-icons-lineal-those-icons-2.png`
                  }
                  alt="downvote"
                />
              </div>
              <div className={styles.countDiv}>
                <span className={styles.count}>{downvotes}</span>
              </div>
            </div>
          </div>
          <div
            className={
              commentHover || showComments === true
                ? styles.commentHover
                : styles.iconContainer
            }
            onMouseEnter={() => setcommentHover(true)}
            onMouseLeave={() => setcommentHover(false)}
            onClick={() => getComment(0)}
          >
            <img
              src={`https://img.icons8.com/external-sbts2018-outline-sbts2018/24/${
                commentHover || showComments === true ? "1b7931" : "6a6a6a"
              }/external-comment-social-media-basic-1-sbts2018-outline-sbts2018.png`}
              alt="comment"
            />
          </div>
          <div
            className={
              reshareHover ? styles.reshareHover : styles.iconContainer
            }
            onMouseEnter={() => setreshareHover(true)}
            onMouseLeave={() => setreshareHover(false)}
          >
            <img
              src={`https://img.icons8.com/ios/50/${
                reshareHover ? "005cb8" : "6a6a6a"
              }/forward-arrow.png`}
              alt="reshare"
            />
          </div>
        </div>
        {showComments && (
          <div className={styles.commentBlock}>
            <textarea
              row={2}
              placeholder="Say Something...."
              className={styles.commentBox}
              onChange={(e) => handleComment(e)}
              value={comment}
            />
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.sendContainer} onClick={() => handleClick()}>
              {clicked === false ? (
                <img
                  className={styles.send}
                  src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/000000/external-send-social-media-prettycons-lineal-prettycons.png"
                  alt="send"
                />
              ) : (
                <img src={Loading} alt="loading" className={styles.loading} />
              )}
            </div>
            {/* {
                            console.log('I am post from return ', post)
                        } */}
            {post.comment && post.comment.length > 0 ? (
              post.comment.map((comment) => (
                <CommentBody comment={comment} key={post._id} />
              ))
            ) : (
              <p className={styles.nocomment}>No Comments Yet !</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostBody;
