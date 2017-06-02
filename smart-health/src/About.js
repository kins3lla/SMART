import React, { Component } from 'react';
import "./about.css"


class About extends Component{
    render() {
        return(
             <div className="about">
                <div className="aboutHeader">
                <h3>SPECIFIC.  MEASUREABLE. ACHIEVABLE. REALISTIC. TIMELY.
                   </h3>

                </div>
                <div className="aboutText">
                <p>We've created an interactive application to help you encourage yourself 
                    to adopt healthy and track the healthy things you do for yourself each day. 
                    <p>We have given you a simple list of healthy and mindful practices that 
                    can stand as recommendations, and encourage you to add your own in the center. </p>
                    You can try compete with yourself, or simply see how many healthy practices 
                    you incorporate into your daily routine. 
                    Our goal is to promote healthy habits without any hits for having fun.</p>
            </div>
            </div>

        );
    }

}

export default About;