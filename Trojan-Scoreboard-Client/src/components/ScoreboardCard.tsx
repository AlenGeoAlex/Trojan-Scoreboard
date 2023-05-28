import styles from "@/styles/View.module.css";
import Confetti from 'react-confetti'
import {useRef} from "react";

export default function ScoreboardCard({houseName, points, change}){

    return(
        <>
            <div className={`${styles.row}`}>

                <div className={`${styles.col} ${styles.colHeading}`}>
                    <h1>{houseName}</h1>

                </div>
                <div className={`${styles.col} ${styles.colDisplay} ${change ? styles.glow : ''}`} id="scoreHome">{points}</div>
            </div>
        </>
    )
}