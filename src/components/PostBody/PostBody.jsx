import React, { useState } from 'react'
import ReadMoreReact from 'read-more-react';
import styles from './PostBody.module.css'
import Loading from './loading.gif'

function PostBody(props) {
    const [upvoteHover, setupvoteHover] = useState(false)
    const [downvoteHover, setdownvoteHover] = useState(false)
    const [commentHover, setcommentHover] = useState(false)
    const [reshareHover, setreshareHover] = useState(false)
    const [upVoteSelected, setupVoteSelected] = useState(false)
    const [downVoteSelected, setdownVoteSelected] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [err, setErr] = useState(null)
    const [comment,setComment] = useState('')
    const [clicked, setClicked] = useState(false)
 
    const {post} = props;

    const handleClick = () => {
        setClicked(true)
        if(comment.length===0)
        {
            setErr('Please type something')
            setClicked(false)
        }
        else
        {
            setErr(null)
            props.createComment(comment,post._id)
            .then(()=>{
                setClicked(false)
                setComment('')
            })
        }
    }

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    let time = post.createdAt.split('T')
    time[1] = time[1].substr(0,time[1].length-5)
    time[0] = time[0].split('-')
    time[0] = time[0][2]+'-'+time[0][1]+'-'+time[0][0]
    return ( 
        <div style={props.style} className={styles.container}>
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
                    <div className={commentHover||showComments===true?styles.commentHover:styles.iconContainer}
                        onMouseEnter={()=>setcommentHover(true)} 
                        onMouseLeave={()=>setcommentHover(false)}
                        onClick={()=>setShowComments(!showComments)}
                    >
                        <img 
                            src={`https://img.icons8.com/external-sbts2018-outline-sbts2018/24/${commentHover||showComments===true?'1b7931':'6a6a6a'}/external-comment-social-media-basic-1-sbts2018-outline-sbts2018.png`}
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
                {
                    showComments && 
                    <div className={styles.commentBlock}>
                        <textarea row={2} placeholder='Say Something....' className={styles.commentBox}
                        onChange={(e)=>handleComment(e)}
                        value={comment}
                        />
                        {
                            err && <p className={styles.error}>{err}</p>
                        }
                        <div className={styles.sendContainer} onClick={handleClick}>
                            {clicked===false ? <img className={styles.send} 
                                src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/000000/external-send-social-media-prettycons-lineal-prettycons.png" 
                                alt='send'
                            />:<img src={Loading} alt='loading' className={styles.loading}/>}
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}

export default PostBody;