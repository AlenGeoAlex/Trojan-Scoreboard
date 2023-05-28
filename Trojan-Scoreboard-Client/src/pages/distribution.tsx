import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/Distribution.module.css'
import {Toast} from "primereact/toast";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import {ResultFormatted} from "@/model/Result";

const Distribution   = () => {

    const defaultResult : ResultFormatted  = {
        blue: [],
        green: [],
        yellow: [],
        white: [],
        unknown: []
    }


    const toastRef = useRef<Toast>();
    const [result, setResultFormatted] = useState(defaultResult);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`/api/admin/get`).then((val) => {
            if(!val.ok){
                toastRef.current?.show({sticky: false, severity: "error", summary: "Unknown error occurred", detail: "Failed to fetch the data from the server"})
                return;
            }

            val.json().then((jsonVal) => {
                //console.log(jsonVal);
                setResultFormatted(jsonVal);
                setLoaded(true);
            }).catch((err) => {
                toastRef.current?.show({sticky: false, severity: "error", summary: "Unknown error occurred", detail: "Failed to fetch the data from the server"})
                console.error(err);
                return;
            })
        }).catch((err) => {
            toastRef.current?.show({sticky: false, severity: "error", summary: "Unknown error occurred", detail: "Failed to fetch the data from the server"})
            console.error(err);
            return;
        })
    }, [])

    return (
        <>
            <Toast ref={toastRef} />
            <div className={styles.container}>
                <Navbar></Navbar>
                {loaded && <Table tableData={result}></Table>}
            </div>
        </>
    );
};

export default Distribution;
