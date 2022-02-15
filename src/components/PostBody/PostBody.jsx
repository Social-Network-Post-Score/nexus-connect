import React from 'react'
import ReadMoreReact from 'read-more-react';
import styles from './PostBody.module.css'

function PostBody() {
    return ( 
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <img src={`https://robohash.org/${Math.random()}.png?size=70x70&set=set2`} alt='random'/>
                </div>
            </div>
            <div className={styles.postContainer}>
                <div>
                    <p className={styles.name}><b>Milan Shawn</b></p>
                    <p className={styles.createdAt}>Created At: 19/01/2022 20:00:24</p>
                </div>
                <div>
                    <ReadMoreReact 
                        text={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora ipsam nam repellendus omnis optio est similique laboriosam expedita amet obcaecati temporibus veritatis illo sed nostrum earum illum ullam enim reprehenderit velit vel modi voluptas, error perferendis? Amet quaerat vitae totam tempore veniam dolor dolorem, nulla fugit, eum omnis aperiam ratione.'}
                        min = {250}
                        ideal = {270}
                        max = {300}
                        readMoreText = {"Read More..."}
                    />
                </div>
            </div>
        </div>
     );
}

export default PostBody;