import React from 'react'
import CreatePost from '../CreatePost/CreatePost';
import Header from '../Header/Header';
import PostBody from '../PostBody/PostBody';

function Posts() {
    return ( 
        <div>
            <div style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.271)" }}>
                <Header light />
            </div>
            <CreatePost/>
            <PostBody/>
        </div>
     );
}

export default Posts;