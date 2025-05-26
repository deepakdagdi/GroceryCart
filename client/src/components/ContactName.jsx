import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>

        <div className="space-y-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <p className="text-gray-600">
              129 Gandhi Street,Mumbai <br />
              Maharashtra ,India
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
            <p className="text-gray-600">+91 (2111) 555-14</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">NatureCart@gmail.com</p>
          </div>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
