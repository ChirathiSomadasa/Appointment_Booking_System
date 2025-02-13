import React from 'react';
import WelcomeImage from '../../images/welcome.png';
import Facility1 from '../../images/facility1.jpg';
import Facility2 from '../../images/facility2.jpg';
import Facility3 from '../../images/facility3.png';
import './Home.css';

function Home() {

  return (
    <div>
      {/* Parallax Section */}
      <div className='parallax'>
        <div className="centered">
          <h1>Appointment Booking</h1>
          <p className="subheading">Your time is valuable, let us make it seamless!</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className='home_body'>
        <div className='welcome_topic'>
          <h1>Welcome to Our Website</h1>
        </div>
        <div className='welcome'>
          <div className='welcome_des'>
            <p>
              Booking an appointment has never been easier or more convenient!
              With our intuitive online platform, you can effortlessly select your preferred date and time from our interactive calendar.
              Whether you're scheduling a consultation, service, or meeting, our streamlined process ensures maximum convenience and flexibility for you.
              Simply provide your details, and within moments, you'll receive instant confirmation of your booking—no more waiting or uncertainty.<br /><br />

              Your time is valuable, and we’re committed to making the entire booking process seamless, efficient, and stress-free.
              From the moment you visit our website to the completion of your appointment, we ensure a smooth and enjoyable experience
              Whether you're booking for yourself or on behalf of someone else, our platform caters to all your needs with precision and care.<br /><br />

              Experience the future of appointment scheduling today.
              Say goodbye to long wait times, outdated systems, and frustrating processes.
              With our cutting-edge platform, you’re in complete control of your schedule.
              Let us help you take the stress out of planning and make every interaction with us a delightful one.
            </p>
          </div>
          <div className='welcome_photo'>
            <img src={WelcomeImage} alt="welcome" />
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className='facilities'>
        <h2 className='section-title'>Our Facilities</h2>
        <div className='facilities-grid'>
          <div className='facility-card'>
            <img src={Facility1} alt="Facility 1" />
            <h3>Online Booking</h3>
            <p>Book appointments anytime, anywhere.</p>
          </div>
          <div className='facility-card'>
            <img src={Facility2} alt="Facility 2" />
            <h3>Instant Confirmation</h3>
            <p>Get instant confirmation of your bookings.</p>
          </div>
          <div className='facility-card'>
            <img src={Facility3} alt="Facility 3" />
            <h3>Flexible Rescheduling</h3>
            <p>Reschedule or cancel with ease.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='cta-section'>
        <h2>Ready to Book Your Appointment?</h2>
        <button className='cta-button'>Book Now</button>
      </div>
    </div>
  );
}

export default Home;