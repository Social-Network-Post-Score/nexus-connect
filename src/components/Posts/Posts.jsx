import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import Header from "../Header/Header";
import PostBody from "../PostBody/PostBody";
import UserList from "../UserList/UserList";
import styles from "./Posts.module.css";

function Posts(props) {
  const [allPosts, setallPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const createPost = async (body) => {
    const data = {
      title: "not-required",
      description: body,
      creator: userData._id,
    };
    await axios
      .post("https://secret-castle-58335.herokuapp.com/api/posts", data)
      .then(() => {
        props.postSuccess();
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = async () => {
    setLoader(true);
    await axios
      .get("https://secret-castle-58335.herokuapp.com/api/posts")
      .then((res) => {
        setallPosts(res.data.data.reverse());
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const getPostById = async (id) => {
    await axios
      .get(`https://secret-castle-58335.herokuapp.com/api/posts/${id}`)
      .then((res) => {
        console.log(res.data.post);
        // setLoader(false)
        let posts = allPosts;
        for(let i=0;i<posts.length;i++){
            if(posts[i]._id === res.data.post._id){
                posts[i] = res.data.post
            }
        }
        console.log('I am posts ',posts);
        setallPosts(posts)
      })
      .catch((err) => console.log(err));
  };

  const createComment = async (content, postId) => {
    const data = {
      content: content,
      creator: userData._id,
      creatorName: userData.name,
      post: postId,
    };
    console.log(data);
    await axios
      .post("http://secret-castle-58335.herokuapp.com/api/comments", data)
      .then(() => props.commentSuccess())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userData === null) {
      props.failedAuthentication();
      history.replace("/");
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      <div>
        <div style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.271)" }}>
          <Header light />
        </div>
        <CreatePost createPost={createPost} />
        <div style={{ margin: "0 auto", width: "40%" }}>
          {loader && (
            <div
              style={{ margin: "0 auto", width: "60px", paddingTop: "20px" }}
            >
              <Bars color="#00BFFF" height={60} width={60} />
            </div>
          )}
        </div>
        {loader === false && allPosts.length === 0 && (
          <p className={styles.nopost}>No posts yet!</p>
        )}
        {allPosts.map((post) => (
          <PostBody
            post={post}
            key={post._id}
            createComment={createComment}
            getPostById={getPostById}
          />
        ))}
      </div>
      <div>
        <UserList />
      </div>
    </>
  );
}

export default Posts;
