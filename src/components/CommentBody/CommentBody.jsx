import React from 'react';
import ReadMoreReact from 'read-more-react';
import styles from './CommentBody.module.css'

function CommentBody({comment}) {
    let time = comment.createdAt.split('T')
    time[1] = time[1].substr(0,time[1].length-5)
    time[0] = time[0].split('-')
    time[0] = time[0][2]+'-'+time[0][1]+'-'+time[0][0]
    // const url = `https://picsum.photos/seed/${user.email}/200/200`
    return ( 
        <div className={styles.container}>
            {/* <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <img src={url} alt='random'/>
                </div>
            </div> */}
            <div className={styles.commentContainer}>
                <div>
                    <p className={styles.name}><b>{comment.creatorName}</b></p>
                    <p className={styles.createdAt}>Created At: {time[0]}&nbsp;&nbsp;{time[1]}</p>
                </div>
                <div>
                    <ReadMoreReact 
                        text={comment.content}
                        min = {100}
                        ideal = {150}
                        max = {300}
                        readMoreText = {"Read More..."}
                    />
                </div>
            </div>
        </div>
     );
}

export default CommentBody;