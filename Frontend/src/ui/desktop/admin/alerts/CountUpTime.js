/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';

export default class CountUpTime extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 0 };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.timer = setInterval(this.countDown, 1000);
      
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds + 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
        var timeAgo = '';
        if(this.state.time.h > 0 ){
            timeAgo = this.state.time.h + (this.state.time.h > 1 ? " hours ": " hour " ) + this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago": " second ago");
        } else if(this.state.time.m > 0){
            timeAgo = this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago": " second ago");
        } else {
            timeAgo = this.state.time.s + (this.state.time.s > 1 ? " seconds ago": " second ago");
        }
      return(
        <span>Last Refresh: <var>{timeAgo}</var></span>
      );
    }
  }
