import React from 'react';
import classes from './Profile.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import PostBody from '../PostBody/PostBody';
import { useState,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';


export default function Profile(props) {

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const [posts,setPosts] = useState([]);
  const history = useHistory();

  const fetchPostUrl = `https://secret-castle-58335.herokuapp.com/api/posts/user/${user._id}`;

  const fetchPosts = async() => {
    const res = await axios.get(fetchPostUrl);
    console.log(res.data.posts);
    setPosts(res.data.posts);
  }

  useEffect(()=>{
    if(user===null)
    {
        props.failedAuthentication();
        history.replace('/');
    }
    else
    {
        fetchPosts();
    }
},[])

  return (
    <>
    <Header light/>
    <div className={classes.mainContainer}>
        <div className={classes.userInfo}>
            <div className={classes.userImage}>
                <img src={user.image} alt="user dp"></img>
            </div>
            <div className={classes.userDetails}>
              <div style={{width:"60%"}}>
                <h1>{user.name}</h1>
                <p style={{marginBottom:"8px"}}>{user.email}</p>
                {/* <p>I am a fourth year student at TIU. I am full stack web developer. I work on React and Spring Boot. My hobbies are watching sci-fi,comics,anime.My dream is to travel the world and eat all cusines.</p> */}
              </div>
                <div className={classes.editButton}>
                  {/* <div>
                  <p>Techno India University</p>
                  <p>Kolkata, India</p>
                  <Link to="">Edit Profile</Link>
                </div> */}
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
                  { posts.map(post=><PostBody post={post} key={post._id} style={{width:"100%",marginBottom:"16px"}}/>)}
              </div>
            </div>
          </div>
    </div>
    </>
  )
}
