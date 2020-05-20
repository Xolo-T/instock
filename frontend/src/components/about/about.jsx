import React from 'react';
import './about.css';

class About extends React.Component {

    render() {
        return(
            <div id="about-container">
                <span className="modal-closer-button" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </span>

                <br/>
                <br/>

                <div id="just-the-four-of-us">

                <div>
                    <img class="profile-pic" src="./ben.jpg"></img>
                    <div class="profile-text">
                            <a class="profile-link" href="https://benhsieh-dev.github.io/" target="_blank">Ben Hsieh</a> is a New York based software engineer that specializes in React JS, JavaScript, and Ruby on Rails.
                    </div>
                </div>

                <br></br>

                <div>
                    <img class="profile-pic" src="./jared.jpg"></img>
                    <div class="profile-text">
                            <a class="profile-link" href="https://jmkaneshiro.github.io/" target="_blank">Jared Kaneshiro</a> is a software engineer who has a passion for creating tools that improve the lives of ordinary people.

He previously worked as both a quality assurance lead and senior product specialist at One Medical. He is well versed in the structure of electronic medical record applications and has working knowledge of Meaningful Use Certification, HL7, ICD-10, CPT, SNOMED, and UMLS.

He lives in New York City, is originally from the San Francisco Bay Area, and is always up for a new adventure. He looks forward to working with you and your team!


                    </div>
                </div>

                <br></br>

                <div>
                    <img class="profile-pic" src="./solomon.jpeg"></img>
                    <div class="profile-text">
                            <a class="profile-link" href="https://solomon-t.github.io/" target="_blank">Solomon Manyaga</a> was in his freshman year of university in Turkey when he first got exposed to programming in a C programming course. After that course he took every course he could that had anything to do with programming. He did VHDL which is a hardware description language for designing integrated circuits. He also dealt with PLC for industrial digital computers and Assembly language for microcontrollers. During the course of four years he realised how much he was inclined to programming and he was sure that this is what he wanted to be doing for a living.

After University he went back home to Tanzania. He wanted to move on to software engineering but it was impossible with an electrical engineering background. In 2018, he managed to move the United States and chose New York City as it has a lot of software engineering opportunities. He had to work in non technical jobs for a year and a half and he managed to join App Academy in their full-time immersive Software Engineering Track

                    </div>
                </div>

                <br></br>

                <div>
                    <img class="profile-pic" src="./taylor.jpg"></img>
                    <div class="profile-text">
                        <a class="profile-link" href="https://twofford.github.io/" target="_blank">Taylor Wofford</a> is a NYC-based software engineer who specializes in React, Redux, Rails, JS and Node. He likes dogs and biking.
                    </div>
                </div>

                </div>

            </div>
        )
    }
}

export default About;