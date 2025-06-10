import React from 'react'

const Contact = () => {
  return (
    <div>
     <form
          action="https://formspree.io/f/xkgjelyp"
          method="POST"
          className="form-container"
        >
          <div >
            <label >Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>

          <div >
            <label >Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div >
            <label >Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              
              required
            ></textarea>
          </div>
          <div >
            <button type="submit" >
              Send Message
            </button>
          </div>
        </form>
        <script src="script.js"></script>
        </div>
  )
}

export default Contact