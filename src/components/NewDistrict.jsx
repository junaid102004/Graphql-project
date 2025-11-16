import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "../graphql";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewDistrictForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    district: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Apollo hooks
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  // console.log("Fetched data:", data);
  const [addUser] = useMutation(ADD_USER, { onCompleted: () => refetch() });
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => refetch(),
  });
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => refetch(),
  });

  const districts = data?.users || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // useEffect(() => console.log("delete mutation", deleteUser), []);
  const validate = () => {
    let newErrors = {};

    // --- Short Code validation ---
    if (!formData.code.trim()) {
      newErrors.code = "Short Code is required";
    } else if (isNaN(formData.code)) {
      newErrors.code = "Short Code must be numbers only";
    } else if (
      districts.some((d) => d.code === formData.code && d.id !== editId)
    ) {
      newErrors.code = "Short Code must be unique";
    }

    // --- District validation ---
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    } else if (/[0-9]/.test(formData.district)) {
      // <-- only simple JS check
      newErrors.district = "District must contain only letters";
    }

    // --- State validation ---
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (/[0-9]/.test(formData.state)) {
      // <-- simple check
      newErrors.state = "State must contain only letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Example inside handleSubmit
    try {
      if (editId) {
        await updateUser({
          variables: {
            id: editId,
            code: formData.code,
            district: formData.district,
            state: formData.state,
          },
        });
        toast.success("District updated successfully ✅");
        setEditId(null);
      } else {
        await addUser({
          variables: {
            code: formData.code,
            district: formData.district,
            state: formData.state,
          },
        });
        toast.success("District added successfully 🚀");
      }
      setFormData({ code: "", district: "", state: "" });
      setErrors({});
    } catch (err) {
      console.error("GraphQL Error:", err);
      toast.error("Something went wrong ❌");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      code: item.code,
      district: item.district,
      state: item.state,
    });
    // console.log("data in the form data  is ",formData);

    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    if (editId === id) {
      setFormData({ code: "", district: "", state: "" });
      setEditId(null);
    }
  };

  if (loading) return <p>Loading districts...</p>;
  if (error) return <p className="text-red-500">Error loading data</p>;

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex max-w-[1200px] w-full flex-col gap-1">
        <h2 className="text-2xl font-semibold text-blue-500 mb-1">District</h2>
        <p className="text-gray-700">
          This form lets you Create/Modify District Details.
        </p>
        <div className="mt-4 font-semibold text-[20px] bg-gray-200 p-2">
          District Details
        </div>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {/* Short Code */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="code" className="font-medium">
              Short Code <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1 w-full">
              <input
                type="text"
                id="code"
                name="code"
                onChange={handleChange}
                value={formData.code}
                className="w-full shadow-lg border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>
          </div>

          {/* District */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="district" className="font-medium">
              District <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1 w-full">
              <input
                type="text"
                id="district"
                name="district"
                onChange={handleChange}
                value={formData.district}
                className="w-full shadow-lg border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">{errors.district}</p>
              )}
            </div>
          </div>

          {/* State */}
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="state" className="font-medium">
              State <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1 w-full">
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                value={formData.state}
                className="w-full shadow-lg border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex pl-[60px] gap-4">
            <button
              type="submit"
              className="bg-gray-200 text-black px-4 py-1 hover:text-white hover:bg-blue-600 transition duration-300"
            >
              {editId ? "Update" : "Save"}
            </button>
            <button
              type="reset"
              onClick={() => setFormData({ code: "", district: "", state: "" })}
              className="bg-gray-200 text-black px-4 py-1 hover:text-white hover:bg-yellow-600 transition duration-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      {districts.length > 0 && (
        <div className="relative overflow-x-auto w-full max-w-[1200px] mt-10">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  District
                </th>
                <th scope="col" className="px-6 py-3">
                  State
                </th>
                {selectedRow != null ? ( // 👈 show only for selected row
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {districts.map((item) => (
                <tr
                  key={item.id}
                  className={`bg-white border-b cursor-pointer ${
                    selectedRow === item.id ? "bg-gray-100" : ""
                  }`}
                  onClick={
                    () =>
                      setSelectedRow(selectedRow === item.id ? null : item.id) // 👈 toggle
                  }
                >
                  <td className="px-6 py-4">{item.code}</td>
                  <td className="px-6 py-4">{item.district}</td>
                  <td className="px-6 py-4">{item.state}</td>

                  {selectedRow === item.id && (
                    <td className="px-6 py-4 flex gap-2">
                      <>
                        <span
                          className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 prevent row click toggle
                            handleEdit(item);
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-sm cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 prevent row click toggle
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </span>
                      </>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default NewDistrictForm;
