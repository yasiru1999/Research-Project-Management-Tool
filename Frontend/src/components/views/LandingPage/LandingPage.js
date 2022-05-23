import React, {Component} from 'react'
import Text from "antd/es/typography/Text";
import About from '../../../../public/img/about.jpg';
import ('../../../../app.css')


const targetTime = new Date().getTime() + 4000000;

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <header id='header'>
                        <div className='intro'>
                            <div className='overlay'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-8 col-md-offset-2 intro-text'>
                                            <div className='headerTop'>
                                                Research Project Management in SLIIT
                                                <span></span>
                                            </div>
                                            <p >
                                                The automated Research Project Management Tool's goal is to make Research project work more
                                                convenient for the student. It will be possible for the system to deal with many services so that all students
                                                who going to do a research project in their 4th year at the SLIIT may do it efficiently
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <div id='about'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-md-6'>
                                {' '}
                                <img src={About} className='img-responsive' alt='' />{' '}
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <div className='about-text'>
                                    <br/>
                                    <h2>About Us</h2>
                                    <p>Find all upcoming international conferences in United States of America for 2021 & 2022 only at
                                        allconferencealert.com - The leading Conference, Event, Seminar, Webinar & Workshop listing provider.
                                        Organizers add their Conferences, Events, Seminars, Webinars & Workshops for free. This means,
                                        organizers can provide information about their event to thousands of academicians, research scholars or respective industry leaders worldwide for no cost at all. Hence, they can create more awareness about their event to targeted users in a short notice. For Subscribers - AllConferenceAlert makes it easier for professionals and attendees to attend international conferences, seminars, and webinars taking place in United States of America and covering over 150 academic subjects. The enthusiasts can receive out conference alerts regularly by becoming subscribers.</p>
                                    {/*<h3>Why Choose Us?</h3>
                                    <div className='list-style'>
                                        <div className='col-lg-6 col-sm-6 col-xs-12'>
                                            <ul>
                                                : 'loading'
                                            </ul>
                                        </div>
                                        <div className='col-lg-6 col-sm-6 col-xs-12'>
                                            <ul>

                                                    : 'loading'}
                                            </ul>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
export default LandingPage;
