import React, { useEffect, useState } from "react";
import axios from "axios";  
const DistrictForm = () => {
    const [formData, setFormData] = useState({
        code: "",
        district: "",
        state: "",
    });
    const [districts, setDistricts] = useState([]);
    const [errors, setErrors] = useState({});
    const [editIndex, setEditIndex] = useState(null); // 👉 track which row we are editing


    const API_URL = process.env.API_URL || "http://localhost:5000/api/districts";
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const fetchDistricts = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetched districts:", response.data);
            // reverse the backend data so newest comes first
            const data = response.data;
            const newdata = [...data];
            console.log("newdata", newdata);
            setDistricts(data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };


    useEffect(() => {
        fetchDistricts();
    }, []);
    const validate = () => {
        let newErrors = {};

        // Code validation - must be only numbers
        if (!formData.code.trim()) {
            newErrors.code = "Short Code is required";
        } else if (isNaN(formData.code)) {
            newErrors.code = "Short Code must contain only numbers";
        }

        // District validation - must not contain numbers
        if (!formData.district.trim()) {
            newErrors.district = "District is required";
        } else if (
            formData.district.split("").some((ch) => !isNaN(ch) && ch !== " ")
        ) {
            newErrors.district = "District must contain only letters";
        }

        // State validation - must not contain numbers
        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        } else if (
            formData.state.split("").some((ch) => !isNaN(ch) && ch !== " ")
        ) {
            newErrors.state = "State must contain only letters";
        }

        // Duplicate validation - cannot insert same Code, District, State combo
        const isDuplicate = districts.some(
            (item) =>
                item.code === formData.code &&
                item.district.toLowerCase() === formData.district.toLowerCase() &&
                item.state.toLowerCase() === formData.state.toLowerCase()
        );

        if (isDuplicate) {
            newErrors.duplicate = "This district already exists!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                if (editIndex !== null) {
                    // 👉 update existing row
                    const response = await fetch(`${API_URL}/${editIndex}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        const sorted = [...data.districts] // 👈 newest first
                        setDistricts(sorted);
                        setEditIndex(null);
                    } else {
                        setErrors({ api: data.error || "Failed to update district" });
                    }
                } else {
                    // 👉 add new row|
                    if (districts.some(d => d.code === formData.code && d.id !== editIndex)) {
                        setErrors({ code: "Code must be unique" });
                        return false;
                    }

                    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });
                    // console.log("response", response);
                    const data = await response.json();
                    //   console.log("data", data);
                    if (response.ok) {
                        const sorted = [...data.districts];
                        setDistricts(sorted);
                    } else {
                        // show backend error (like "Code must be unique")
                        setErrors({ api: data.error || "Failed to add district" });
                    }

                }

                // reset form
                setFormData({ code: "", district: "", state: "" });
                setErrors({});
            } catch (error) {
                setErrors({ api: "Server error. Please try again." });
            }
        }
    };


    const editData = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const data = await response.json();
            if (response.ok) {
                console.log("Fetched district for edit:", data);
                let item = data;
                setFormData({ code: item.code, district: item.district, state: item.state });
                setEditIndex(id);
            } else {
                setErrors({ api: data.error || "Failed to fetch district details" });
            }
        } catch (error) {
            setErrors({ api: "Server error. Please try again." });
        }
        // setFormData({ code: item.code, district: item.district, state: item.state });
        setEditIndex(id);
    };



    const deleteData = async (id) => {
        try {
            // console.log("Deleting id:", id);
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (response.ok) {
                setDistricts(data.districts);
                // reset if deleting currently edited row
                if (editIndex === id) {
                    setFormData({ code: "", district: "", state: "" });
                    setEditIndex(null);
                }
            } else {
                setErrors({ api: data.error || "Failed to delete district" });
            }
        } catch (error) {
            setErrors({ api: "Server error. Please try again." });
        }
    };
    // useEffect(() => {
    //     console.log("districts updated:", districts);
    // }, [districts]);
    return (
        <div className="w-full mx-auto flex flex-col     items-center justify-center mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex max-w-[1200px] w-full flex-col gap-1">
                <h2 className="text-2xl font-semibold text-blue-500 mb-1">District</h2>
                <p className="text-gray-700">
                    This form lets you Create/Modify District Details.
                </p>
                <div className="mt-4 font-semibold text-[20px] bg-gray-200 p-2">
                    District Details
                </div>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>

                    {errors.duplicate && (<p className="text-red-500 text-sm mt-2">{errors.duplicate}</p>)}

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
                            Save
                        </button>
                        <button
                            type="reset"
                            onClick={() => setFormData({ code: "", district: "", state: "" })}
                            className="bg-gray-200 text-black px-4 py-1 hover:text-white hover:bg-yellow-600 transition duration-300"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            className="bg-gray-200 text-black px-4 py-1 hover:text-white hover:bg-red-600 transition duration-300"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="bg-gray-200 text-black px-4 py-1 hover:text-white hover:bg-purple-600 transition duration-300"
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
            {districts && districts.length > 0 && formData.state.trim() !== "0" && (
                <div className="relative overflow-x-auto w-full max-w-[1200px] mt-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Code</th>
                                <th scope="col" className="px-6 py-3">District</th>
                                <th scope="col" className="px-6 py-3">State</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {districts.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-6 py-4">{item.code}</td>
                                    <td className="px-6 py-4">{item.district}</td>
                                    <td className="px-6 py-4">{item.state}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300 cursor-pointer" onClick={() => editData(item?.id)}>Edit</span>
                                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300  cursor-pointer" onClick={() => deleteData(item?.id)}>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default DistrictForm;
