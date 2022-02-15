import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react'
import styles from './CreatePost.module.css'

function CreatePost() {
    const [post, setpost] = useState('')
    return ( 
        <div className={styles.container}>
            <TextArea 
                className={styles.textarea} 
                rows={5} 
                placeholder="What's on your mind ?" 
                onChange={(e)=>setpost(e.target.value)}
            />
            <div className={styles.btnDiv}>
                <Button 
                    type='primary' 
                    size="large" 
                    shape='round' 
                    className={styles.btnStyling} 
                    disabled={post.length===0}
                >
                    Post
                </Button>
            </div>
        </div>
     );
}

export default CreatePost;