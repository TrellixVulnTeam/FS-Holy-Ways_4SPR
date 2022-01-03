import React, { useContext, useState } from 'react'
import {Button, Card, Image, ProgressBar} from 'react-bootstrap'

import { Link } from "react-router-dom";

import FormLoginModal from './FormLoginModal';
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router';

function Login() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div to="/login" className='login'>
                <Button onClick={() => setModalShow(true)} variant="outline-light">Donate Now</Button>
            </div>

            <FormLoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}


function CardList(props) {

    const [state] = useContext(UserContext)
    // console.log(state.user.status)
    let history = useHistory();

    // const handleEdit = (id) => {
    //     history.push({
    //         pathname: `/formfund/${id}`
    //     })
    //     // <Link to="/viewfund/"id ></Link>
    // }

    return (
        <Card id={props.id} className="card-style mt-4 mb-2" style={{ width: '25rem' }}>
            <Image src={props.thumbnail} alt={props.thumbnail} rounded />
            <Card.Body>
                <Card.Title className="title mb-4">
                    <h4>{props.title}</h4>
                </Card.Title>
                <Card.Text className="description">
                    <p>{props.description}</p>
                </Card.Text>
                <div className="progress-bar my-3">
                    <ProgressBar variant="danger" now={30} style={{ height: '7px' }} />
                </div>
                <Card.Text className="group-btn d-flex justify-content-between">
                    <Card.Text>
                            <h5  className="money align-items-center">{props.money}</h5>
                    </Card.Text>
                    <Card.Text >
                        {!state.isLogin ? (
                                <Login />
                            ): (
                                <Link onClick={() => props.goDetail(props.id) } className="button-card-style">
                                    <Button
                                        className="btn py-2 px-5"
                                        variant="danger">
                                        {props.buttonName}</Button>
                                </Link>
                            )}
                        </Card.Text>
                </Card.Text>
                {state.user.status === "admin" ? (
                <Card.Text className="group-btn d-flex justify-content-end">
                    <Card.Text >
                            <div className='button d-flex justify-content-end mb-4' style={{ width: '25rem' }}>
                                <div className="div btn-edit mx-2">
                                    <Button onClick={() => { history.push(`/formupdate/${props.id}`) } }variant="success">edit</Button>
                                </div>
                                <div className="div btn-delete">
                                    <Button onClick={() => props.remove(props.id) } variant="danger">delete</Button>
                                </div>
                            </div>
                        </Card.Text>
                </Card.Text>
                    ) : (
                        <div></div>
                    )}

            </Card.Body>
        </Card>
    )
}

export default CardList