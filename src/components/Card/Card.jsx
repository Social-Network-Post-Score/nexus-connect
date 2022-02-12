import React from 'react'
import styles from './Card.module.css'

function Card(props) {
    return ( 
        <div className={styles.container}>
            <div className={styles.imageContainer}>
              <a href={props.linkedin} target="_blank" rel="noreferrer"><img src={props.image} alt={props.name}/></a>  
            </div>
            <div>
                <p className={styles.name}><b>{props.name}</b></p>
                <p className={styles.desig}><i>{props.designation}</i></p>
            </div>
        </div>
     );
}

export default Card;