import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite';
import OrgValidate from './OrgValidate';

const AddEmployee = () => {
  const user = OrgValidate();

  // Function to generate random password
  const pwdGen = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: pwdGen(8), // Generate random password on component load
    contact: '',
    empOrgId: '', // Initialize with an empty string
  });
  const [loading, setLoading] = useState(false);

  // Update formData org field once user is available
  useEffect(() => {
    if (user._id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        empOrgId: user._id,
      }));
    }
  }, [user]);
  console.log(formData)



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make POST request with formData
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/add-emp`, formData);
      toast.success('Employee added successfully!');

      // Clear form data after successful submission (excluding password and org)
      setFormData({
        name: '',
        email: '',
        password: pwdGen(8), // Generate new random password
        contact: '',
        empOrgId: user._id, // Reset org to user._id
        stop: '',
      });
    } catch (error) {
      console.log(error)
      toast.error('Error adding driver.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              placeholder="Enter contact number"
              required
            />
          </div>
         
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;