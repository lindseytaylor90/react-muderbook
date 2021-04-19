import React from 'react';
import './Login.css';
import { useStateValue } from '../../state/Provider';
import { actionTypes } from '../../state/reducer';
import mbLogo from '../../img/mbLogo.webp';
import mbTextLogo from '../../img/mbTextLogo.svg';
import { Button } from '@material-ui/core';
import { baseUrl } from '../../shared/baseUrl';
import user from '../../data/user';
import posts from '../../data/posts';

const [state, dispatch] = useStateValue();

export const fetchPosts = () => dispatch => {
    return fetch(baseUrl + 'user')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json())
    .then(posts => dispatch({
        type: actionTypes.INIT_POSTS,
        posts
    }))
    .catch(error => error);
};

export const fetchUser = () => dispatch => {
    return fetch(baseUrl + 'user')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json())
    .then(user => dispatch({
        type: actionTypes.SET_USER, 
        user,
    }), initPosts())
    .catch(error => error);
};



const initPosts = () => {
    fetchPosts();
}

const Login = () => {
    
    const signIn = () => {
        fetchUser();
    }


    return (
        <div className="login">
            Hoolo world 2
            <div className="loginLogo">
                <img src={mbLogo} alt=""/>
                <img src={mbTextLogo} alt="murderbook"/>
            </div>
            <Button type="submit" onClick={signIn}>
                Sign In
            </Button>
        </div>
    )
}

export default Login;