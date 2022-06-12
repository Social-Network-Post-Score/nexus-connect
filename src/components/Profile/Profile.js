import React from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import Header from "../Header/Header";
import PostBody from "../PostBody/PostBody";
import { Bars } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBarComponent from "../Header/ReactHeader";

export default function Profile(props) {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const { userId } = useParams();

  console.log(user);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  console.log("Logged user", loggedUser);
  const friendsList = loggedUser.friends.split(",");
  console.log("Friends List: ", friendsList);
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const [disabled, setDisbaled] = useState(false);

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
    setPosts(res.data.posts.reverse());
  };

  const handleOnClickFollow = async () => {
    setDisbaled(true);
    loggedUser.friends += `${user._id},`;
    console.log("logged user after button press: " + loggedUser);
    await axios
      .patch(
        `https://secret-castle-58335.herokuapp.com/api/users/${loggedUser._id}`,
        loggedUser
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleOnClickUnfollow = async () => {
    setDisbaled(true);
    console.log(user._id);
    let friends = friendsList.filter((id) => user._id !== id).join();
    console.log("Friends: ", friends);
    loggedUser.friends = friends;
    console.log("logged user after button press: ", loggedUser);
    await axios
      .patch(
        `https://secret-castle-58335.herokuapp.com/api/users/${loggedUser._id}`,
        loggedUser
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleOnClickFriend = (id) => {
    console.log(id);
    window.location.replace(`/profile/${id}`);
  };

  useEffect(() => {
    if (loggedUser === null) {
      props.failedAuthentication();
      history.replace("/");
    } else {
      setLoader(true);
      fetchUser();
      fetchPosts();
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      <NavBarComponent/>
      <div style={{ margin: "0 auto", width: "40%" }}>
        {loader && (
          <div style={{ margin: "0 auto", width: "60px", paddingTop: "20px" }}>
            <Bars color="#00BFFF" height={60} width={60} />
          </div>
        )}
      </div>
      {user && !loader && (
        <>
          <div className={classes.mainContainer}>
            <div className={classes.userInfo}>
              <div className={classes.userImage}>
                <img
                  src={`https://picsum.photos/seed/${user.email}/200/200`}
                  alt="user dp"
                ></img>
              </div>
              <div className={classes.userDetails}>
                <div style={{ width: "60%" }}>
                  <h1>{user.name}</h1>
                  <p style={{ marginBottom: "8px" }}>{user.email}</p>
                  <p>Birthday: {user.dob ? user.dob : "Not mentioned"}</p>
                  <br />
                  <p>{user.about}</p>
                </div>
                <div className={classes.editButton}>
                  {loggedUser._id === user._id ? (
                    <Link to="/user/accountInfo">Edit Profile</Link>
                  ) : friendsList.includes(user._id) ? (
                    <button
                      className={classes.followButton}
                      onClick={() => handleOnClickUnfollow()}
                    >
                      {disabled ? "unfollowing..." : `unfollow`}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOnClickFollow()}
                      className={classes.followButton}
                    >
                      {disabled ? "following..." : `+ follow`}
                    </button>
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
                  <h2>Following</h2>
                  <h3>{user.friends.length}</h3>
                </div>
                <div className={classes.friends}>
                  {user != null &&
                    user.friends.map((friend) => {
                      return (
                        <div
                          className={classes.friend}
                          onClick={() => handleOnClickFriend(friend._id)}
                        >
                          <img
                            src={`https://picsum.photos/seed/${friend.email}/200/200`}
                          />
                          <p>{friend.name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={classes.postsContainer}>
                <div className={classes.postsHeading}>
                  <h2>Your Posts</h2>
                </div>
                <div className={classes.posts}>
                  {posts.map((post) => (
                    <PostBody
                      post={post}
                      creator={user}
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
