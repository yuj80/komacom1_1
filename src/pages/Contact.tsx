import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
    const { contact } = useAdmin();

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center text-zinc-900">Contact Us</h1>
                <p className="text-zinc-500 text-center mb-16 text-lg whitespace-pre-line">
                    {contact.introText}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Info Column */}
                    <div className="space-y-8 bg-zinc-50 p-8 rounded-3xl h-fit">
                        <h3 className="text-2xl font-bold mb-6">Contact Info</h3>

                        <div className="flex items-start space-x-4">
                            <MapPin className="mt-1 flex-shrink-0 text-blue-600" size={24} />
                            <div>
                                <p className="font-bold text-zinc-900">Address</p>
                                <p className="text-zinc-600">{contact.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Mail className="mt-1 flex-shrink-0 text-blue-600" size={24} />
                            <div>
                                <p className="font-bold text-zinc-900">Email</p>
                                <p className="text-zinc-600">{contact.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Phone className="mt-1 flex-shrink-0 text-blue-600" size={24} />
                            <div>
                                <p className="font-bold text-zinc-900">Phone</p>
                                <p className="text-zinc-600">{contact.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <form className="space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-xl">
                        <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-700">Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-700">Email</label>
                                <input type="email" className="w-full bg-gray-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700">Inquiry Type</label>
                            <select className="w-full bg-gray-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-zinc-700">
                                <option>General Inquiry</option>
                                <option>Project Request</option>
                                <option>Recruitment</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700">Message</label>
                            <textarea className="w-full bg-gray-50 border border-zinc-200 rounded-lg px-4 py-3 h-40 focus:outline-none focus:border-blue-500 focus:bg-white transition-all" placeholder="Tell us about your project..."></textarea>
                        </div>

                        <button type="button" className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-zinc-800 transition-colors text-lg shadow-lg">
                            전송하기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
