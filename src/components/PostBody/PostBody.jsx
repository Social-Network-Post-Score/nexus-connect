import React, { useState } from 'react'
import ReadMoreReact from 'read-more-react';
import styles from './PostBody.module.css'

function PostBody({post}) {
    const [upvoteHover, setupvoteHover] = useState(false)
    const [downvoteHover, setdownvoteHover] = useState(false)
    const [commentHover, setcommentHover] = useState(false)
    const [reshareHover, setreshareHover] = useState(false)
    const [upVoteSelected, setupVoteSelected] = useState(false)
    const [downVoteSelected, setdownVoteSelected] = useState(false)

    let time = post.createdAt.split('T')
    time[1] = time[1].substr(0,time[1].length-5)
    time[0] = time[0].split('-')
    time[0] = time[0][2]+'-'+time[0][1]+'-'+time[0][0]
    return ( 
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <img src={post.creatorImage} alt='random'/>
                </div>
            </div>
            <div className={styles.postContainer}>
                <div>
                    <p className={styles.name}><b>{post.creatorName}</b></p>
                    <p className={styles.createdAt}>Created At: {time[0]}&nbsp;&nbsp;{time[1]}</p>
                </div>
                <div>
                    <ReadMoreReact 
                        text={post.description}
                        min = {250}
                        ideal = {270}
                        max = {300}
                        readMoreText = {"Read More..."}
                    />
                </div>
                <div className={styles.interaction}>
                    <div className={upvoteHover?styles.updownHover:styles.iconContainer}
                        onMouseEnter={()=>setupvoteHover(true)} 
                        onMouseLeave={()=>setupvoteHover(false)}
                        onClick={()=>setupVoteSelected(true)}
                    >
                        <img 
                            src={upVoteSelected?`https://img.icons8.com/external-those-icons-fill-those-icons/24/288cfb/external-up-arrows-those-icons-fill-those-icons-2.png`:`https://img.icons8.com/external-those-icons-lineal-those-icons/24/${upvoteHover?'288cfb':'6a6a6a'}/external-up-arrows-those-icons-lineal-those-icons-2.png` }
                            alt="upvote"
                        />
                    </div>
                    <div className={downvoteHover?styles.updownHover:styles.iconContainer}
                        onMouseEnter={()=>setdownvoteHover(true)}
                        onMouseLeave={()=>setdownvoteHover(false)}
                        onClick={()=>setdownVoteSelected(true)}
                    >
                        <img  
                            src={downVoteSelected?`https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/288cfb/external-down-arrows-kmg-design-glyph-kmg-design-1.png`:`https://img.icons8.com/external-those-icons-lineal-those-icons/24/${downvoteHover?'288cfb':'6a6a6a'}/external-down-arrows-those-icons-lineal-those-icons-2.png`}
                            alt="downvote"
                        />
                    </div>
                    <div className={commentHover?styles.commentHover:styles.iconContainer}
                        onMouseEnter={()=>setcommentHover(true)} 
                        onMouseLeave={()=>setcommentHover(false)}
                    >
                        <img 
                            src={`https://img.icons8.com/external-sbts2018-outline-sbts2018/24/${commentHover?'1b7931':'6a6a6a'}/external-comment-social-media-basic-1-sbts2018-outline-sbts2018.png`}
                            alt="comment"
                        />
                    </div>
                    <div className={reshareHover?styles.reshareHover:styles.iconContainer}
                        onMouseEnter={()=>setreshareHover(true)} 
                        onMouseLeave={()=>setreshareHover(false)}
                    >
                        <img
                            src={`https://img.icons8.com/ios/50/${reshareHover?'005cb8':'6a6a6a'}/forward-arrow.png`}
                            alt = "reshare"
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PostBody;