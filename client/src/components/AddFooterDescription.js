import React, { useState, useEffect } from "react";
import SummaryApi from "../common";

const AddFooterDescription = () => {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [message, setMessage] = useState("");
    const [footerDescriptions, setFooterDescriptions] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchFooterDescriptions();
    }, []);

    // Fetch footer descriptions
    const fetchFooterDescriptions = async () => {
        try {
            const response = await fetch(SummaryApi.showFooterDescription.url, {
                method: SummaryApi.showFooterDescription.method,
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                setFooterDescriptions(data);
            } else {
                setMessage("Failed to fetch footer descriptions!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `${SummaryApi.AddFooterDescription.url}` : SummaryApi.AddFooterDescription.url;
            const method = editingId ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: editingId }), // Send ID for update
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(editingId ? "Updated successfully!" : "Added successfully!");
                setFormData({ title: "", description: "" });
                setEditingId(null);
                fetchFooterDescriptions();
            } else {
                setMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    // Handle edit
    const handleEdit = (desc) => {
        setFormData({ title: desc.title, description: desc.description });
        setEditingId(desc._id); // Ensure _id is used (MongoDB)
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${SummaryApi.DeleteFooterDescription.url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                setMessage("Deleted successfully!");
                fetchFooterDescriptions();
            } else {
                setMessage("Failed to delete!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Manage Footer Description</h2>
                {message && <p className="text-center font-semibold mb-4 text-red-600">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
                    >
                        {editingId ? "✏️ Update" : "🚀 Submit"}
                    </button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Footer Descriptions</h2>
                <table className="w-full border-collapse border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {footerDescriptions.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="border p-4 text-center">No descriptions available.</td>
                            </tr>
                        ) : (
                            footerDescriptions.map((desc) => (
                                <tr key={desc._id} className="border">
                                    <td className="border p-2">{desc.title}</td>
                                    <td className="border p-2">{desc.description}</td>
                                    <td className="border p-2 flex space-x-2">
                                        <button onClick={() => handleEdit(desc)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                        <button onClick={() => handleDelete(desc._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddFooterDescription;
