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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `${SummaryApi.updateFooterDescription.url}/${editingId}` : SummaryApi.AddFooterDescription.url;
            const method = editingId ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(editingId ? "Updated successfully!" : "Added successfully!");
                setFormData({ title: "", description: "" });
                setEditingId(null);
                fetchFooterDescriptions();
            } else {
                setMessage("Something went wrong!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    const handleEdit = (desc) => {
        setFormData({ title: desc.title, description: desc.description });
        setEditingId(desc.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${SummaryApi.AddFooterDescription.url}/${id}`, {
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
        <div className="min-h-screen flex flex-col items-center p-6 ">
            <div className="w-full p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Footer Description</h2>
                {message && <p className="text-center font-semibold mb-4 text-red-600 bg-red-100 p-2 rounded-lg">{message}</p>}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                    <button
                        onClick={handleSubmit}
                        className="w-fit px-6 bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                        {editingId ? "✏️ Update" : "🚀 Submit"}
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                    {footerDescriptions.length === 0 ? (
                        <p className="text-center text-gray-500">No descriptions available.</p>
                    ) : (
                        footerDescriptions.map((desc) => (
                            <div key={desc.id} className="p-4 bg-gray-100 rounded-lg shadow flex flex-col space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800">{desc.title}</h3>
                                <p className="text-gray-600">{desc.description}</p>
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => handleEdit(desc)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Edit</button>
                                    <button onClick={() => handleDelete(desc.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddFooterDescription;