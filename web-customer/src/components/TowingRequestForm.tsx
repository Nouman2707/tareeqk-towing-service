import React, { useState } from 'react';
import { towingRequestAPI } from '../services/api';
import { FormErrors } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface TowingRequestFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const TowingRequestForm: React.FC<TowingRequestFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    location: '',
    note: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Customer name is required';
    } else if (formData.customer_name.trim().length < 2) {
      newErrors.customer_name = 'Customer name must be at least 2 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 5) {
      newErrors.location = 'Location must be at least 5 characters';
    }

    if (formData.note && formData.note.length > 500) {
      newErrors.note = 'Note must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await towingRequestAPI.create({
        customer_name: formData.customer_name.trim(),
        location: formData.location.trim(),
        note: formData.note.trim() || undefined
      });

      if (response.success) {
        onSuccess('Towing request submitted successfully! Our team will contact you shortly.');
        setFormData({ customer_name: '', location: '', note: '' });
        setErrors({});
      } else {
        if (response.errors) {
          const serverErrors: FormErrors = {};
          Object.entries(response.errors).forEach(([key, messages]) => {
            serverErrors[key as keyof FormErrors] = messages[0];
          });
          setErrors(serverErrors);
        }
        onError(response.message || 'Failed to submit towing request');
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      onError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Towing Service</h2>
        <p className="text-gray-600">Fill out the form below and we'll dispatch a tow truck to your location.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            className={`input-field ${errors.customer_name ? 'input-error' : ''}`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.customer_name && (
            <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`input-field ${errors.location ? 'input-error' : ''}`}
            placeholder="Enter your current location (street, landmark, area)"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={4}
            className={`input-field ${errors.note ? 'input-error' : ''}`}
            placeholder="Describe the issue with your vehicle (optional)"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.note && (
              <p className="text-sm text-red-600">{errors.note}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.note.length}/500 characters
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-3 text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" color="text-white" />
              <span className="ml-2">Submitting Request...</span>
            </div>
          ) : (
            'Submit Towing Request'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
            <p className="text-sm text-blue-700 mt-1">
              • Our team operates 24/7 across Dubai<br/>
              • Average response time: 15-30 minutes<br/>
              • Please stay with your vehicle if safe to do so
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowingRequestForm;