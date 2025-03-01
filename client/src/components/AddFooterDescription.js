import React, { useState, useEffect } from "react";
import SummaryApi from "../common";

const AddFooterDescription = () => {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [message, setMessage] = useState("");
    const [footerDescription, setFooterDescription] = useState(null);

    useEffect(() => {
        fetchFooterDescription();
    }, []);

    // Fetch footer description (only one entry allowed)
    const fetchFooterDescription = async () => {
        try {
            const response = await fetch(SummaryApi.showFooterDescription.url, {
                method: SummaryApi.showFooterDescription.method,
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok && data.length > 0) {
                setFooterDescription(data[0]);
                setFormData({ title: data[0].title, description: data[0].description });
            } else {
                setMessage("No footer description found!");
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
            const response = await fetch(SummaryApi.AddFooterDescription.url, {
                method: footerDescription ? "PUT" : "POST", // Update if exists, else add
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || "🎉 Offer updated successfully!");
                await fetchFooterDescription(); // Refresh data
            } else {
                setMessage(data.error || "Something went wrong!");
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
                        {footerDescription ? "✏️ Update Offer" : "🚀 Submit Offer"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFooterDescription;
