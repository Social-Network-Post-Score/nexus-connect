import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { Collapse } from "reactstrap";
import CreatePost from "../CreatePost/CreatePost";
// import Header from "../Header/Header";
import NavBarComponent from "../Header/ReactHeader";
import PostBody from "../PostBody/PostBody";
import UserList from "../UserList/UserList";
import styles from "./Posts.module.css";

function Posts(props) {
  const [allPosts, setallPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openUserList, setOpenUserList] = useState(false)
  const userData = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const createPost = async (body) => {
    const post = {
      comments: 0,
      createdAt: '',
      creator: userData._id,
      creatorEmail: userData.email,
      creatorImage: userData.image,
      creatorName: userData.name,
      description: body,
      dislikeUsers: "",
      downvotes: 0,
      likeUsers: "",
      shares: 0,
      title: "not-required",
      upvotes: 0,
      __v: 0
    }
    props.postSuccess();
    let posts = allPosts;
    posts.unshift(post)
    setallPosts(posts)
    const data = {
      title: "not-required",
      description: body,
      creator: userData._id,
    };
    await axios
      .post("https://secret-castle-58335.herokuapp.com/api/posts", data)
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = async () => {
    setLoader(true);
    await axios
      .get(
        `https://secret-castle-58335.herokuapp.com/api/posts/${userData._id}`
      )
      .then((res) => {
        setallPosts(res.data.data);
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
      .post("https://secret-castle-58335.herokuapp.com/api/comments", data)
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
        {/* <div style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.271)" }}>
          <Header light />
        </div> */}
        <NavBarComponent />
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
        <div className={styles.collapseContainer}>
          <div onClick={()=>setOpenUserList(!openUserList)} className={styles.collapseBtn}>
            <div>
              <b>Find and follow users</b>
            </div>
            <div>
              {
                openUserList ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />
              }
            </div>
          </div>
          <Collapse isOpen={openUserList} className={styles.collapse}>
            <div className={styles.userList}>
              <UserList side/>
            </div>
          </Collapse>
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
            user = {userData}
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
