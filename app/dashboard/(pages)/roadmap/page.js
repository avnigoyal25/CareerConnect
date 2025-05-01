'use client';
import { useState } from 'react';
import Navbar from '../../_components/navbar/page';
import GlobalApi from '@/app/_services/GlobalApi';

export default function CareerRoadmapForm({ onGenerate }) {
    const [careerGoal, setCareerGoal] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [learningStyle, setLearningStyle] = useState('video');
    const [roadmap, setRoadmap] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await GlobalApi.GenerateCareerRoadmap({
                careerGoal,
                educationLevel,
                learningStyle
            });

            // You can now do something with `response.data`, like:
            setRoadmap(response.data.roadmap);
        } catch (error) {
            console.error("Failed to generate roadmap:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='bg-blue-50 min-h-screen'>
            <Navbar />
            {!roadmap && (
                <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 border">
                    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Generate Your Career Roadmap</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Career Goal</label>
                            <input
                                type="text"
                                value={careerGoal}
                                onChange={(e) => setCareerGoal(e.target.value)}
                                placeholder="e.g. Frontend Developer"
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Current Education Level</label>
                            <select
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Select</option>
                                <option value="High School Student">High School Student</option>
                                <option value="graduation student">Graduation</option>
                                <option value="post graduation student">Post Graduation</option>
                                <option value="Working Professional">Working Professional</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Preferred Learning Style</label>
                            <select
                                value={learningStyle}
                                onChange={(e) => setLearningStyle(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="video">Video Courses</option>
                                <option value="text">Text-Based Articles</option>
                                <option value="interactive">Interactive Learning</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                        >
                            {loading ? 'Generating...' : 'Generate Roadmap'}
                        </button>
                    </form>
                </div>
            )}

            {roadmap && (
                <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br bg-black shadow-lg rounded-2xl border border-indigo-300">
                    <h3 className="text-2xl font-bold mb-6 text-white text-center">🚀 Your Personalized Career Roadmap</h3>

                    <div className="space-y-6">
                        {roadmap.split(/\n(?=\d+\.)/).map((step, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow border-l-4 border-indigo-500">
                                <p className="text-gray-900 whitespace-pre-line font-medium">{step.trim()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <br />
        </div>
    );
}
