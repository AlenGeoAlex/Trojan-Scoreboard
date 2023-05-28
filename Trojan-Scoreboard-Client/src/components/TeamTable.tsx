import styles from "@/styles/Table.module.css";
import {useEffect} from "react";

export default function TeamTable({team}) {


    return(
        <>
            <div className="row">
                <div className="col-md-4 col-12">
                    <ul className="list-unstyled">
                        <li className=" ">
                            {team.length > 0 &&
                                team.map((eachEvent, index) => (
                                    <div key={eachEvent.id} className={`mt-3 mb-2`} >
                                        <h3 className="mt-0 mb-1">Event : {eachEvent.itemName}</h3>
                                        <h6 className={styles.p}>Scored {eachEvent.point} points with {eachEvent.position} position</h6>
                                    </div>
                                ))
                            }

                            {team.length <= 0 &&
                                <div className={`mt-3 mb-2`} >
                                    <h4 className="mt-0 mb-1">🔴 No records yet!</h4>
                                </div>
                            }
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}