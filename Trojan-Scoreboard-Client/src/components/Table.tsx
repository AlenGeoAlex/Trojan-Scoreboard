import styles from "@/styles/Table.module.css";
import TeamTable from "@/components/TeamTable";
import {useEffect, useState} from "react";

const Table = ({tableData}) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log(tableData)
        if(tableData)
            setLoaded(true);
    }, [])

    return (
        <section className="mt-5 ">
            {loaded && <div className="container mt-2">
                <h2 className={styles.tableHeading}>Green</h2>

                <div className={styles.bbrd}>
                    <TeamTable team={tableData.green}  ></TeamTable>
                </div>
            </div>}
            {loaded &&<div className="container mt-2">
                <h2 className={styles.tableHeading}>Blue</h2>
                <div className={styles.bbrd2}>
                    <TeamTable team={tableData.blue} ></TeamTable>
                </div>
            </div>}

            {loaded &&<div className="container mt-2">
                <h2 className={styles.tableHeading}>Yellow</h2>
                <div className={styles.bbrd3}>
                    <TeamTable team={tableData.yellow} ></TeamTable>
                </div>
            </div>}

            {loaded &&<div className="container mt-2 pb-5">
                <h2 className={styles.tableHeading}>White</h2>
                {<div className={styles.bbrd4}>
                    <TeamTable team={tableData.white} ></TeamTable>
                </div>}
            </div>}
        </section>
    );
};

export default Table;
