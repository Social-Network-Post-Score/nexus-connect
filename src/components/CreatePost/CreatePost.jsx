import { Button } from 'antd';
import React, { useState } from 'react'
import styles from './CreatePost.module.css'

function CreatePost(props) {
    const [post, setpost] = useState('')

    const handlePost = () => {
        props.createPost(post);
        setpost('')
    }
    return ( 
        <div className={styles.container}>
            <textarea
                id="postbox" 
                className={styles.textarea} 
                rows={5} 
                placeholder="What's on your mind ?" 
                onChange={(e)=>setpost(e.target.value)}
                value={post}
            />
            <div className={styles.btnDiv}>
                <Button 
                    type='primary' 
                    size="large" 
                    shape='round' 
                    className={styles.btnStyling} 
                    disabled={post.length===0}
                    onClick = {handlePost}
                >
                    Post
                </Button>
            </div>
        </div>
     );
}

export default CreatePost;