import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token){
    localStorage.setItem('token', token);
}

function initApp(){
    const token = getToken();
    if(token){
        window.location.href = "/";
    }
}


export { getToken, setToken, initApp };