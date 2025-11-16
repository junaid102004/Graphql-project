import React from "react";

const StudentCourseUI = () => {
  return (
    <div className="p-6 space-y-10">
      {/* Students Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Students</h2>

        {/* Student Form */}
        <form className="grid grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Age"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="col-span-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Student
          </button>
        </form>

        {/* Student Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Ali</td>
              <td className="px-4 py-2">ali@example.com</td>
              <td className="px-4 py-2">20</td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:bg-green-300">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Courses Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Courses</h2>

        {/* Course Form */}
        <form className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Description"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="col-span-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Save Course
          </button>
        </form>

        {/* Course Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Math 101</td>
              <td className="px-4 py-2">Basic Algebra</td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:bg-green-300">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Enrollments Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Enrollments</h2>

        {/* Enrollment Form */}
        <form className="grid grid-cols-2 gap-4 mb-6">
          <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400">
            <option>Select Student</option>
            <option>Ali</option>
          </select>
          <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400">
            <option>Select Course</option>
            <option>Math 101</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Enroll Student
          </button>
        </form>

        {/* Enrollment Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Ali</td>
              <td className="px-4 py-2">Math 101</td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:bg-green-300">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCourseUI;
