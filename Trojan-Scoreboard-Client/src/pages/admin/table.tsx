import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useRouter} from "next/router";
import {Result, ResultFormatted} from "@/model/Result";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Trash, ArrowBarLeft } from "react-bootstrap-icons";



export default function AdminTable(){

    const defaultArray : ResultFormatted = {
        blue: [],
        green: [],
        white: [],
        yellow: [],
        unknown: []
    };

    const loginData = useSelector((state : RootState) => state.loginData);
    const router = useRouter();
    const [requested, setRequested] = useState(false);

    const [list, setList] = useState(defaultArray);

    const handleDelete = (id) => {
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }

        setRequested(true);
        fetch(`/api/admin/result/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": loginData.jwt,
            }
        }).then((res) => {
            if(res.ok)
                get();
            else {
                console.log(res.statusText + " "+res.status);
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setRequested(false);
        })
    }

    function removeFromList(id) {
        var number = list.yellow.findIndex(s => s.id === id);
        if(number >= 0){
            const newList = {
                ...list,
                yellow: list.yellow.splice(number, 1)
            }
            setList(newList)
            return;
        }

        number = list.green.findIndex(s => s.id === id);
        if(number >= 0){
            const newList = {
                ...list,
                green: list.green.splice(number, 1)
            }
            setList(newList)
            return;
        }

        number = list.blue.findIndex(s => s.id === id);
        if(number >= 0){
            const newList = {
                ...list,
                blue: list.blue.splice(number, 1)
            }
            setList(newList)
            return;
        }

        number = list.white.findIndex(s => s.id === id);
        if(number >= 0){
            const newList = {
                ...list,
                white: list.white.splice(number, 1)
            }
            setList(newList)
            return;
        }
        
    }

    function get(){
        fetch(`/api/admin/get/`)
            .then((val) => {
                if(!val.ok){
                    return;
                }

                val.json().then((jsonVal) => {
                    setList(jsonVal);
                }).catch((err) => {
                    console.log(err)
                    return;
                })
            }).finally(() => {

        });
    }

    const back = () => {
        console.log(123)
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }else{
            router.push("/admin/data");
        }
    }

    useEffect(() => {
        if(!loginData.jwt){
            router.push("/auth/login");
            return;
        }

        get();
    }, []);

    return(
        <>
            <Container className="bg-dark text-light py-5" fluid>
                <Row className="bg-dark text-white p-2" onClick={() => back}>
                    <Col>
                        <ArrowBarLeft display="Go Back" className="text-danger"  />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="text-center  text-light my-4" >Blue Team</h2>
                        <Table className=" text-light"  bordered responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Event</th>
                                <th>Point</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.blue.map(({ id, itemName, point, position}) => (
                                <tr key={id}>
                                    <td>{id}</td>

                                    <td>{itemName}</td>
                                    <td>{point}</td>
                                    <td>{position}</td>
                                    <td>
                                        {!requested && <Trash className="text-danger" onClick={() => handleDelete(id)} /> }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center my-4">Yellow Team</h2>
                        <Table className=" text-light"  bordered responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Event</th>
                                <th>Point</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.yellow.map(({ id, itemName, point, position}) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{itemName}</td>
                                    <td>{point}</td>
                                    <td>{position}</td>
                                    <td>
                                        {!requested && <Trash className="text-danger" onClick={() => handleDelete(id)} /> }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center my-4">White Team</h2>
                        <Table className=" text-light"  bordered responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Event</th>
                                <th>Point</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.white.map(({ id, itemName, point, position}) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{itemName}</td>
                                    <td>{point}</td>
                                    <td>{position}</td>
                                    <td>
                                        {!requested && <Trash className="text-danger" onClick={() => handleDelete(id)} /> }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center my-4">Green Team</h2>
                        <Table className=" text-light"  bordered responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Event</th>
                                <th>Point</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.green.map(({ id, itemName, point, position}) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{itemName}</td>
                                    <td>{point}</td>
                                    <td>{position}</td>
                                    <td>
                                        {!requested && <Trash className="text-danger" onClick={() => handleDelete(id)} /> }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="text-center my-4">Unknown</h2>
                        <Table className=" text-light"  bordered responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Event</th>
                                <th>Point</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.unknown?.map(({ id, itemName, point, position}) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{itemName}</td>
                                    <td>{point}</td>
                                    <td>{position}</td>
                                    <td>
                                        {!requested && <Trash className="text-danger" onClick={() => handleDelete(id)} /> }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}