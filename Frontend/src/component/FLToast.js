import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const FLToast = (props) => (
    <React.Fragment>
        <ToastContainer position="top-right" autoClose={props.autoClose} hideProgressBar={props.hideProgressBar} newestOnTop={props.newestOnTop} closeOnClick
                    pauseOnVisibilityChange draggable pauseOnHover />
    </React.Fragment>
)
