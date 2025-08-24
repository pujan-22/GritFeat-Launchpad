import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Define the form schema with Zod
const userSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .refine((val) => val.trim().length > 0, {
      message: 'First name cannot be only whitespace'
    })
    .regex(/[A-Z][a-z]+/, 'Invalid first name format'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .refine((val) => val.trim().length > 0, {
      message: 'Last name cannot be only whitespace'
    })
    .regex(/[A-Z][a-z]+/, 'Invalid last name format'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  contactNumber: z.string()
    .min(1, 'Contact number is required')
    .regex(/^9[0-9]{9}$/, 'Invalid contact number format'),
  role: z.string()
    .min(1, 'Role is required'),
  skills: z.array(z.object({
    value: z.string()
      .min(1, 'Skill is required')
      .refine((val) => val.trim().length > 0, {
        message: 'Skill cannot be only whitespace'
      })
  })).min(1, 'At least one skill is required'),
  message: z.string().optional()
});

// Infer the TypeScript type from the Zod schema
type UserFormData = z.infer<typeof userSchema>;

const UserRegistrationForm = () => {
  const [submittedData, setSubmittedData] = useState<UserFormData | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      skills: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    // In a real application, you would send this data to your API
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Registration
        </h1>

        {submittedData && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Success!</p>
            <p>Your registration has been submitted successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number *
            </label>
            <input
              id="contactNumber"
              type="tel"
              maxLength={10}
              {...register('contactNumber')}
              placeholder="9xxxxxxxxx"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.contactNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role *
            </label>
            <select
              id="role"
              {...register('role')}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
              <option value="admin">Administrator</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Skills - Dynamic Field Array */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills *
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-2">
                <input
                  {...register(`skills.${index}.value` as const)}
                  className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.skills?.[index]?.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter a skill"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.skills && typeof errors.skills.message === 'string' && (
              <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
            )}
            <button
              type="button"
              onClick={() => append({ value: '' })}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Display Submitted Data (for demonstration) */}
        {submittedData && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Submitted Data:</h2>
            <pre className="bg-white p-4 rounded overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegistrationForm;