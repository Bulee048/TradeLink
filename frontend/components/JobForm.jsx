"use client";

import { useState } from "react";

export default function JobForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (formData.contactEmail && !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  const inputClasses = (error) => `
    w-full bg-slate-50 border rounded-2xl py-4 px-4 text-gray-900 outline-none transition-all
    ${error ? 'border-red-300 ring-4 ring-red-500/10' : 'border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10'}
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
          Job Information
        </h2>
        
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 px-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClasses(errors.title)}
            placeholder="e.g. Emergency plumbing needed for kitchen leak"
          />
          {errors.title && <p className="mt-2 text-xs font-bold text-red-600 px-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 px-1">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className={inputClasses(errors.description)}
            placeholder="Describe the problem, the required skills, and any specific constraints..."
          />
          {errors.description && <p className="mt-2 text-xs font-bold text-red-600 px-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2 px-1">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClasses()}
              >
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Painting</option>
                <option>Joinery</option>
                <option>Other</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2 px-1">
              Job Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClasses()}
              placeholder="e.g. Colombo 07"
            />
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
          Contact Person
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-2 px-1">
              Full Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={inputClasses()}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-bold text-gray-700 mb-2 px-1">
              Email Address
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={inputClasses(errors.contactEmail)}
              placeholder="you@example.com"
            />
            {errors.contactEmail && <p className="mt-2 text-xs font-bold text-red-600 px-1">{errors.contactEmail}</p>}
          </div>
        </div>
      </div>

      <div className="pt-10">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-5 rounded-2xl text-white font-black text-xl shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              Publishing...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Publish Job Request
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs text-gray-400 font-medium">
          By publishing, you agree to our Terms of Service and Community Guidelines.
        </p>
      </div>
    </form>
  );
}
