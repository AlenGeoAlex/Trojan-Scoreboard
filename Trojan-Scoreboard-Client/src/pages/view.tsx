import styles from '@/styles/View.module.css'
import ScoreboardCard from "@/components/ScoreboardCard";
import {useEffect, useState} from "react";

import {ResultFormatted, ResultValue} from "@/model/Result";
import {useWindowSize} from 'react-use';
import Confetti from "react-confetti";

export default function View() {

    const defaultFormatted : ResultValue = {
        blue: 0,
        green: 0,
        white: 0,
        yellow: 0,
    }



    const [timerId, setTimerId] = useState<NodeJS.Timer>();
    const [formatted, setFormatted] = useState(defaultFormatted);
    const [firstTime, setFirstTime] = useState(false);
    const [changed, setChanged] = useState(false);
    const [blueGlow, setBlueGlow] = useState(false);
    const [greenGlow, setGreenGlow] = useState(false)
    const [yellowGlow, setYellowGlow] = useState(false)
    const [whiteGlow, setWhiteGlow] = useState(false)

    const {width, height} = useWindowSize();

    function getValue() {
        fetch("/api/chart/").then((val) => {
            if(!val.ok){
                return;
            }

            val.json().then((jsonVal) => {
                setFormatted((oldValue) => {
                    checkForAnimation(oldValue, jsonVal);
                    return jsonVal;
                });

            }).catch((err) => {
                console.error(err);
            })
        }).catch((err) => {
            console.error(err);
        })
    }

    function checkForAnimation(old : ResultValue, newVal : ResultValue){
        var shouldChange : boolean = false;

        var bG = false;
        var wG = false;
        var gG = false;
        var yG = false;

        if(newVal.white > old.white){
            shouldChange = true;
            wG = true;
        }

        if(newVal.green > old.green){
            shouldChange = true;
            gG = true;
        }

        if(newVal.yellow > old.yellow){
            shouldChange = true;
            yG = true;
        }

        if(newVal.blue > old.blue){
            shouldChange = true;
            bG = true;
        }


        setBlueGlow(bG);
        setGreenGlow(gG);
        setYellowGlow(yG);
        setWhiteGlow(wG);

        setChanged((old) => {
            return shouldChange;
        });
    }

    useEffect(() => {
        if(timerId){
            clearInterval(timerId);
        }

        const timer = setInterval(() => {
            getValue();
        }, 10 * 1000);

        setTimerId(timer);
        getValue();


        return () => {
            console.log("TImer id "+timerId)
            clearInterval(timerId);
        }
    }, [])



    return(
        <>
            {
                changed &&
                <Confetti
                    width={width}
                    height={height}
                />
            }
        <div className={styles.display}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <ScoreboardCard houseName={`🔵 Blue`} points={formatted.blue} change={blueGlow}></ScoreboardCard>
                </div>
                <div className="row">
                    <ScoreboardCard houseName={`🟡 Yellow`} points={formatted.yellow} change={yellowGlow}></ScoreboardCard>
                </div>
                <div className="row">
                    <ScoreboardCard houseName={`🟢 Green`} points={formatted.green} change={greenGlow}></ScoreboardCard>
                </div>
                <div className="row">
                    <ScoreboardCard houseName={`⚪ White`} points={formatted.white} change={whiteGlow}></ScoreboardCard>
                </div>
            </div>
        </div>
        </>
    )

}