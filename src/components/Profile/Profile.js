import React from 'react';
import classes from './Profile.module.css';
import userImage from './userdp.jpg';
import axios from 'axios';
import Posts from '../Posts/Posts';
import Header from '../Header/Header';
import PostBody from '../PostBody/PostBody';
import { useState,useEffect } from 'react';
import bgimg from './userbackground.jpg';
import { Link } from 'react-router-dom';
export default function Profile() {

  const [posts,setPosts] = useState([]);
  const fetchPosts = async() => {
    const res = await axios.get("https://secret-castle-58335.herokuapp.com/api/posts/user/61f7f39c7185b500169f8a2a");
    console.log(res.data.posts);
    setPosts(res.data.posts);
  }

  // const showPosts = () => {posts.map((item,index)=>{
  //   <PostBody post={item} key={index}/>
  // })}

  // useEffect(()=>{
  //   fetchPosts();
  //   return ()=>{};
  // },[]);

  return (
    <>
    <Header light/>
    <div className={classes.mainContainer}>
        <div className={classes.userInfo}>
            <div className={classes.userImage}>
                <img src={userImage} alt="user dp"></img>
            </div>
            <div className={classes.userDetails}>
              <div style={{width:"60%"}}>
                <h1>Keshav Ojha</h1>
                <p style={{marginBottom:"8px"}}>keshav@gmail.com</p>
                <p>I am a fourth year student at TIU. I am full stack web developer. I work on React and Spring Boot. My hobbies are watching sci-fi,comics,anime.My dream is to travel the world and eat all cusines.</p>
              </div>
                <div className={classes.editButton}>
                  <div>
                  <p>Techno India University</p>
                  <p>Kolkata, India</p>
                  <Link to="">Edit Profile</Link>
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
                  <PostBody style={{width:"100%",marginBottom:"16px"}}/>
                  <PostBody style={{width:"100%",marginBottom:"16px"}}/>
                  <PostBody style={{width:"100%",marginBottom:"16px"}}/>
                  <PostBody style={{width:"100%",marginBottom:"16px"}}/>
              </div>
            </div>
          </div>
    </div>
    </>
  )
}
