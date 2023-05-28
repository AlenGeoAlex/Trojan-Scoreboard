import {useRef, useState} from 'react';
import Head from 'next/head';
import styles from '@/styles/Login.module.css';
import {LoginInput} from "@/model/LoginModel";
import {Toast} from "primereact/toast";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {loginDataSlice, set, setValue} from "@/slice/authSlice";
import {RootState} from "@/store";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [waiting, setWaiting] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const state = useSelector((state : RootState) => state.loginData.jwt);

    let toastRef = useRef<Toast | undefined>(undefined);

    const handleSubmit = (event) => {
        setWaiting(true);
        event.preventDefault();
        const data : LoginInput = {
            username: username,
            password: password
        };

        if(!data.username || !data.password){
            toastRef?.current?.show({sticky: false, severity: "warn", summary: "Incomplete", detail: "Please fill in all fields!"})
            return;
        }

        fetch("/api/auth/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if(!response.ok)
            {
                if(response.status === 401){
                    toastRef?.current?.show({sticky: false, severity: "error", summary: "Failed", detail: response.status ? response.status : "Unknown user"})
                    setPassword("");
                    setUsername("");
                    return;

                }

                console.log(response.status)
                toastRef?.current?.show({sticky: false, severity: "error", summary: "Failed", detail: response.status ? response.status : "Failed to login!"})
                setPassword("");
                setUsername("");
                return;
            }
            response.json().then(data => {
                dispatch(loginDataSlice.actions.setValue(data.jwt))
                router.push("/admin/data")
            }).catch(error => {
                console.error('Error:', error);
            });
        }).finally(() => {
            setWaiting(false);
        });

    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Toast ref={toastRef} />


            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={styles.title}>Login</h1>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor="username">
                            Username
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.button} disabled={waiting} type="submit">
                        Login
                    </button>
                </form>

{/*                <Puff
                    height="80"
                    width="80"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={waiting}
                />*/}
            </div>
        </>
    );
}