import React, { useEffect, useState, useRef } from 'react'
import * as jwt_decode from 'jwt-decode'
import '../styles/Contact.scss'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Retrieve from sessionStorage
    const stored = sessionStorage.getItem('User') || '';
    const decoded = jwt_decode.jwtDecode<{ name:string,email:string }>(stored)
    setName(decoded.name);
    setEmail(decoded.email);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    // Send the form data to Formspree
    const response = await fetch("https://formspree.io/f/xkgjelyp", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Redirect to homepage after successful submission
      window.location.href = "/home";
    } else {
      alert("There was an error sending your message.");
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form-container"
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={name}
            readOnly
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={email}
            readOnly
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact