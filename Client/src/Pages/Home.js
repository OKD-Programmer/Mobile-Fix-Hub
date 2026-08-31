import React from 'react';
import '../Styles/Home.css';
import headerimg from '../imgs/header.jpg';
import section2img from '../imgs/Section-img.png';


export const Home = () => {
    return (
        <div className="Home-Header">
            {/* Background Image */}
            <img src={headerimg} alt="Mobile Repair Background" />

            {/* Section 1 - Left side information */}
            <section className="Home-Section1">
                <div className="section1-content">
                    <h1>Welcome to MobileFixHub</h1>
                    <p className="hover-text">
                        Your trusted partner for all mobile device repairs.
                        With years of experience and certified technicians, we provide
                        fast, reliable, and affordable repair services for all major
                        smartphone brands. From screen replacements to battery issues,
                        we've got you covered with quality parts and expert service.
                    </p>
                </div>
            </section>

            {/* Section 2 - Right side image */}
            <section className="Home-Section2">
                <div className="section2-content">
                    <img
                        src={section2img}
                        alt="Phone Repair Service"
                        className="IMG-Section2"
                    />
                </div>
            </section>
            <section className='section3'><h1>Your one-step hub for mobile repairs, phones, parts, and accessories.</h1></section>

            {/* Section 3 - Services */}
        </div>)}