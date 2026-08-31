import React, { useState } from 'react';
import '../Styles/ContactUs.css';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-us">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us - We'd love to hear from you</p>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-section">
            <h2>Get In Touch</h2>
            <p>Fill out the form and our team will get back to you within 24 hours.</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Business Street<br />Tyre, State 12345</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+961 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>MobleFixHub@company.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">🕒</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="What is this regarding?"
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us how we can help you..."
                rows="6"
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          {/* Embedded Google Map - Replace with your actual location */}


          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.494597613786!2d35.226505575580305!3d33.283433573456016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151e879a50be601f%3A0x2b04b52b3dac9da4!2sLebanese%20International%20University%2C%20Tyre%20Campus!5e1!3m2!1sen!2sus!4v1764013758734!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lebanese International University Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

