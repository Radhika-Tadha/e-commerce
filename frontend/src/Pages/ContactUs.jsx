import React, { useState } from "react";

export default function ContactUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <style>{
        `
      body .container-contact{
      background-color: rgb(234, 247, 255);
      }
      .container-contact input.form-control {
      background-color: rgb(234, 247, 255); 
      border: none;
      border-bottom: 1px solid black;
      border-radius: 0;
      box-shadow: none;
      }
      .container-contact textarea.form-control{
      background-color:rgb(234, 247, 255);
      border: none; 
      border-bottom: 1px solid black;
      border-radius: 0;
      box-shadow: none;
      }
      .custom-readmore {
           border: 1px solid rgb(17, 63, 103);
           color: rgb(17, 63, 103);
           background-color: transparent;
           border-radius: 0;
           padding: 8px 20px;
           transition: background-color 0.3s ease, color 0.3s ease;
        }
      .custom-readmore:hover {
           background-color: rgb(17, 63, 103);
           color: #ffff;
        }
      `
      }</style>
      <div className="container-contact mt-5 mb-5 p-4">
        <h2 className="text-center mb-4 fw-bold">Let me know what's on your mind</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-3 text-start">
                <label className="form-label ">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control rounded-0 shadow-none text-start"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control rounded-0 shadow-none text-start"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Leave us a message...</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control rounded-0 shadow-none text-start"
                  rows="3"
                  required
                />
              </div>
              <div className="text-end">
      
                <button type="submit" className="btn custom-readmore rounded-0">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
