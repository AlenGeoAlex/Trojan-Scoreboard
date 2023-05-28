import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from '@/styles/Data.module.css';
import {Toast} from "primereact/toast";

export default function Data() {


    interface FormData {
        eventName : string
        point: number
        position: number | null,
        team : "WHITE" | "YELLOW" | "UNKNOWN" | "BLUE" | "GREEN",
    }

    const defaultFormData : FormData  = {
        eventName: "",
        point: 0,
        position: null,
        team: "UNKNOWN"
    }

    const [waiting, setWaiting] = useState(false);
    const toastRef = useRef<Toast>();
    const [formData, setData] = useState(defaultFormData);
    const [eventName, setEventName] = useState("");
    const [point, setPoints] = useState("0");
    const [position, setPosition] = useState("");
    const [team, setTeam] = useState("UNKNOWN");

    const loginData = useSelector((state : RootState) => state.loginData);
    const router = useRouter();

    useEffect(() => {
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }


    }, []);

    const clear = (event) => {
        setEventName("");
        setPoints("0");
        setPosition("");
        setTeam("UNKNOWN");
    }

    const adminView = (event) => {
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }

        router.push("/admin/table");
        return;
    }

    const handleSubmit = (event) => {
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }
        event.preventDefault();
        setWaiting(true);
        if(!eventName || eventName.length <= 0){
            return;
        }

        formData.eventName = eventName;

        if(!point || point.length === 0){
            formData.point = 0;
        }else{
            var number = Number.parseInt(point);
            if(isNaN(number))
                formData.point = 0;
            else formData.point = number;
        }

        if(!position || position === "null"){
            formData.position = null;
        }else{
            const parseInt = Number.parseInt(position);
            if(!parseInt || isNaN(parseInt) ||parseInt < 1 || parseInt > 4)
                formData.position = null;
            else
                formData.position = parseInt;
        }

        if(!team || team === "null"){
            formData.team = "UNKNOWN"
        }else{
            if(team === "WHITE")
                formData.team = "WHITE";
            else if (team === "GREEN")
                formData.team = "GREEN";
            else if(team === "BLUE")
                formData.team = "BLUE";
            else if(team === "YELLOW")
                formData.team = "YELLOW";
            else formData.team = "UNKNOWN";
        }

        console.log(formData);
        fetch("/api/result/",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': loginData.jwt,
                },
                body: JSON.stringify(formData)
            })
            .then((result) => {
                if(!result){
                    toastRef.current?.show({sticky:false, detail: "Failed to create result", severity: "error", summary: "Unknown error"})
                    return
                }

                if(!result.ok){
                    if(result.status === 401){
                        toastRef.current?.show({sticky:false, severity: "error", detail: "Please login again.", summary: "Session Timed out"})
                        router.push("/auth/login");
                        return;
                    }

                    toastRef.current?.show({sticky:false, severity: "error", detail: result.status+ " : "+result.statusText, summary: "Failed"})

                    return;
                }

                toastRef.current?.show({sticky:false, detail: "Created", severity: "success", summary: "New result has been created!"})

            })
            .finally(() => {
                setWaiting(false);
                clear(null);
            })
    };

    return (
        <>
            <Toast ref={toastRef} />
                <div className={styles.formContainer}>
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Create New Result</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="event-name">Event Name</label>
                                <input onChange={(event) => setEventName(event.target.value)} className={styles.formInput} type="text" id="event-name" name="event-name" value={eventName} placeholder="Enter event name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="point-position">Points</label>
                                <input className={styles.formInput} onChange={(event) => setPoints(event.target.value)}  type="number" id="point-position" name="point-position" value={point} placeholder="Enter point position" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="position">Position</label>
                                <select className={styles.formSelect} onChange={(event) => setPosition(event.target.value)}  id="position" value={position} name="position">
                                    <option value="" >Select a position</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="team">Team</label>
                                <select className={styles.formSelect} onChange={event => setTeam(event.target.value)} placeholder="Select a team"  id="team" value={team} name="team" required>
                                    <option value="WHITE">White</option>
                                    <option value="GREEN">Green</option>
                                    <option value="YELLOW">Yellow</option>
                                    <option value="BLUE">Blue</option>
                                    <option value="UNKNOWN">Unknown</option>

                                </select>
                            </div>
                            <button className={styles.formSubmit} type="submit" disabled={waiting}>Create Result</button>
                            <input type="button"  className={styles.formSubmit} onClick={clear} value="Reset" disabled={waiting}/>
                            <input type="button"  className={styles.formSubmit} onClick={adminView} value="Administrator View" disabled={waiting}/>

                        </form>
                    </div>
                </div>
        </>
    )
}