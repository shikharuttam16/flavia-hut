import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SummaryApi from "../common";

const AddFooterDescription = () => {
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [message, setMessage] = useState("");
    const [footerDescriptions, setFooterDescriptions] = useState([]);

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
            console.log("API Response:", data);
            if (response.ok) {
                setFooterDescriptions(Array.isArray(data) ? data : []);
            } else {
                setMessage(data.error || "Failed to fetch footer descriptions!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.AddFooterDescription.url, {
                method: SummaryApi.AddFooterDescription.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("API Response:", data);
            if (response.ok) {
                setMessage(data.message || "🎉 Offer added successfully!");
                setFormData({ title: "", description: "" });

                await fetchFooterDescriptions(); // Refresh list after add
            } else {
                setMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            setMessage("Server error! Try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">✨ Add Footer Description</h2>
                {message && (
                    <p className={`text-center font-semibold mb-4 ${typeof message === "string" && message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        ></textarea>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all"
                    >
                        🚀 Submit Offer
                    </motion.button>
                </form>
            </motion.div>

            <div className="mt-8 w-full max-w-lg p-6 bg-white shadow-2xl rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">📜 Footer Descriptions</h2>
                {footerDescriptions.length === 0 ? (
                    <p className="text-center text-gray-600">No descriptions available.</p>
                ) : (
                    <ul className="space-y-2">
                        {footerDescriptions.map((desc, index) => (
                            <li key={index} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100">
                                <strong>{desc.title}</strong>: {desc.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddFooterDescription;
