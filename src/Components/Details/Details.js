import React from 'react'
import "../Dashboard/dashboard.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Details() {
    const navigate = useNavigate();

    function getOnClick() {
        axios.post('http://localhost:9000/polls/create', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("sending poll creation request")
            console.log(res);
            localStorage.setItem('pollId', res.data._id);
            console.log(localStorage.getItem('pollId'));
        }).then( axios.post('http://localhost:9000/polls/populate', {
            poll: localStorage.getItem('pollId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
            }
        }).then().then(res => {
            console.log("sending question creation request")
            console.log(res);
            localStorage.setItem('questionsId', res.data._id);
            console.log(localStorage.getItem('questionsId'));
            navigate("/create-poll")
        }).catch(err => console.log(err.message))).catch(err => console.log(err.message))
    }

    return (
        <div className='details'>
            <h2 className='head1'>Get all your insights in one place</h2>
            <h3 className='head2'>Creating polls was never easier</h3>
            <div className='button-grp'>
                <button className={"dark-button"} onClick={getOnClick}>Create a new Poll</button>
                <button onClick={() => navigate("/view-polls")} className='no-fill stroke-button'>View Existing</button>
            </div>
        </div>
    )
}

export default Details