import React from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import Header from "../Header/Header";
import PostBody from "../PostBody/PostBody";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const friendsList = loggedUser.friends.split(",");
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const fetchUser = async () => {
    await axios
      .get(`https://secret-castle-58335.herokuapp.com/api/users/${userId}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  const fetchPosts = async () => {
    const fetchPostUrl = `https://secret-castle-58335.herokuapp.com/api/posts/user/${userId}`;
    const res = await axios.get(fetchPostUrl);
    console.log(res.data.posts);
    setPosts(res.data.posts);
  };

  useEffect(() => {
    if (loggedUser === null) {
      props.failedAuthentication();
      history.replace("/");
    } else {
      fetchUser();
      fetchPosts();
    }
  }, []);

  return (
    <>
      <Header light />
      {user && (
        <>
          <div className={classes.mainContainer}>
            <div className={classes.userInfo}>
              <div className={classes.userImage}>
                <img
                  src={`https://robohash.org/${user.name}.png?size=200x200&set=set2`}
                  alt="user dp"
                ></img>
              </div>
              <div className={classes.userDetails}>
                <div style={{ width: "60%" }}>
                  <h1>{user.name}</h1>
                  <p style={{ marginBottom: "8px" }}>{user.email}</p>
                  <p>{`Birthday: ${user.dob}`}</p>
                  <br />
                  <p>{user.about}</p>
                </div>
                <div className={classes.editButton}>
                  {loggedUser._id === user._id ? (
                    <Link to="/user/accountInfo">Edit Profile</Link>
                  ) : friendsList.includes(user._id) ? (
                    <button disabled className={classes.followButton}>
                      Following
                    </button>
                  ) : (
                    <button className={classes.followButton}>Follow</button>
                  )}
                  <div>
                    <p>{user.college}</p>
                    <p>
                      {user.city}, {user.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.friendsContainer}>
                <div className={classes.friendsHeading}>
                  <h2>Friends</h2>
                </div>
                <div className={classes.friends}></div>
              </div>
              <div className={classes.postsContainer}>
                <div className={classes.postsHeading}>
                  <h2>Your Posts</h2>
                </div>
                <div className={classes.posts}>
                  {posts.map((post) => (
                    <PostBody
                      post={post}
                      key={post._id}
                      style={{ width: "100%", marginBottom: "16px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
