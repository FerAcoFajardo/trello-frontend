import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function getUser() {
    return localStorage.getItem('user');
}

function setUser(user){
    localStorage.setItem('user', user);
}

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token){
    localStorage.setItem('token', token);
}

function removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

function initApp(){
    const token = getToken();
    if(token){
        window.location.href = "/";
    }
}




export { getToken, setToken, removeToken, getUser, setUser, initApp };