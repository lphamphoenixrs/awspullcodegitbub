import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './ui/common/header/AppHeader';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.app_body = React.createRef();
        this.app_cart = React.createRef();
    }

    componentWillMount() {
    }

    // forceUpdateAppBody(){
    //     this.app_body.current.forceUpdate();
    // }

    // reloadHeaderCart(){
    //     if(this.app_cart && this.app_cart.current){
    //         this.app_cart.current.reloadCart();
    //     }
    // }

    // setPermission() {
    //     let accessParam = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
    //     if (!Libs.isBlank(accessParam)) {
    //         try {
    //             let permission = JSON.parse(Libs.base64Decrypt(accessParam));
    //             this.permission = permission;
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    // }
    // componentDidMount(){
        // let token = localStorage.getItem(Constants.COMMON.TOKEN);
        // const protocol = location.protocol;
        // const API_HOST = process.api_host || Constants.API_HOST;
        // const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
        // const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT;
        // let url = null;
        // if(protocol == 'https:'){
        //     url = protocol+"//"+API_HOST+":"+API_HTTPS_PORT
        // }else{
        //     url = protocol+"//"+API_HOST+":"+API_HTTP_PORT
        // }
        // var socket = io.connect(url,{ transports: ['websocket']});
        // socket.on('connect', function(){
        //     socket.emit('authenticate', {token: token});
        //     socket.on('unauthorized', ()=>{
        //         socket.emit('hello', {aa: 12});
        //     });
        //     socket.on('onclose', ()=>{
        //     });
        //     socket.on('onerror', (err)=>{
        //     });
            
        //   });
        // var socket = io.connect("http://localhost:3002",{ transports: ['websocket'], extraHeaders: {
        //     Authorization: token
        // } });
        // socket.on('notify', function(rs){
        //     // console.log("notify:", rs)
        // });
        // socket.on('join', (rs)=>{
        //    // console.log("join:", rs)
        // });
        // socket.on('disconnect', function (data) {
        //     console.log("data disconnect: ",data)
        // });
        // if(localStorage.getItem(Constants.COMMON.REMEMBER))
        // { window.location.href = Constants.FRONT_SITE_URL.DEFAULT_PAGE; return }
    // }
    render() {
        return (
            // <div className="abc">Server render</div>
            <Router>
                <Fragment>
                <div className="wrapper">
                    <AppHeader parent={this} ref={this.app_cart} />
                    
                    <div canvas="container" className="content-wrapper">
                        {/* <AppBody parent={this} ref={this.app_body} /> */}
                    </div>
                    {/* <AppFooter /> */}
                </div>
                </Fragment>
            </Router>
        )
    }
    
}