import Head from "next/head";
import styles from "@/styles/Home.module.css";
import PieChart from "@/components/PieChart";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";


const Home = () => {
    const router = useRouter();

    const breakpoints = [
        {responsive: {options: {legend: {position: "right"}, chart: {width: 300}}, breakpoint: 768}},
        {responsive: {options: {legend: {position: "bottom"}, chart: {width: 400}}, breakpoint: 992}},
    ];



    const [noteString, setNotString] = useState("");


    useEffect(() => {
        const pointChanges : string[] = [
            "Please keep in mind that it may take some time before you see a change in points.",
            "It's important to note that changes in points may not be immediately visible, and may take some time to show up.",
            "Be patient when tracking your points, as it may take some time for changes to be reflected.",
            "Don't worry if you don't see a change in points right away - it can take some time for updates to take effect.",
            "Remember that changes to your points balance may not be instantaneous, and it may take some time to see the effects of your actions."
        ]

        setNotString(pointChanges[Math.floor(Math.random() * pointChanges.length)])
    }, [])


    function routeToPoint() {
        router.push("/distribution")
        return;
    }

    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Silkscreen&display=swap"
                              rel="stylesheet"/>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossOrigin="anonymous"/>

                <script async="true" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossOrigin="anonymous"></script>

                <meta name="description" content="See the live results of Trojan 4 here at trojan4.live" key="desc" />
                <meta property="og:title" content="Live Results | Trojan" />
                <meta
                    property="og:description"
                    content="See the live results of Trojan 4 here at trojan4.live"
                />
                <meta
                    property="og:image"
                    content="https://imgur.com/hZxF9RC.png"
                />
                <title>Live Results | Trojan</title>
            </Head>
            <Navbar></Navbar>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2>Live Point Statistics</h2>
                    <PieChart breakpoints={breakpoints}/>
                    <h6 onClick={routeToPoint} className={`mt-2 ${styles.pointDistribution}`}>Click here to see the
                        point distribution</h6>
                    <span className={`mt-2 text-bold`}>Note: {noteString} </span>

                </div>

            </div>
        </div>
    );
};

export default Home;
