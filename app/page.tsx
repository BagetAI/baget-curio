"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Globe, Zap, Leaf } from 'lucide-react';

const WAITLIST_DB_ID = "db_8592038475"; // Placeholder, will update after create_database call

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [count, setCount] = useState(148);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      // Note: In a real Next.js app, this would be an API route to hide the DB ID,
      // but for this prototype we're wiring it directly to the public Baget endpoint.
      const response = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            email,
            source: 'landing_page',
            timestamp: new Date().toISOString(),
          }
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden relative">
      <div className="mesh-bg" />
      
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#C05E42] rounded-full flex items-center justify-center text-white font-bold text-xl">C</div>
          <span className="text-2xl font-bold tracking-tight text-slate-950 font-outfit">Curio</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-slate-600 font-medium">
          <a href="#how-it-works" className="hover:text-[#C05E42] transition-colors">How it works</a>
          <a href="#kits" className="hover:text-[#C05E42] transition-colors">Kits</a>
          <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-950 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all">Join Waitlist</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-[#C05E42]/10 text-[#C05E42] px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C05E42] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C05E42]"></span>
              </span>
              <span>Launching Summer 2026</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-950 leading-[1.1] mb-8 font-outfit">
              Master Global Flavors. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C05E42] to-[#E1AD01]">Zero Spice Waste.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curio delivers pre-portioned, chef-grade spice kits for authentic international dinners. The exact amount you need for one recipe, delivered in a flat-pack that fits in your mailbox.
            </p>

            <form id="waitlist" onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl focus:outline-none text-slate-950"
                  required
                />
                <button 
                  disabled={status === 'loading'}
                  className="bg-[#C05E42] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#C05E42]/90 transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </div>
              {status === 'success' && (
                <p className="text-green-600 mt-4 flex items-center justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 mr-2" /> You're on the list! We'll reach out soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
              )}
              <p className="text-slate-400 text-sm mt-4">Join {count} home cooks waiting for Curio.</p>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white animate-float">
              <img src="/images/hero-kit.png" alt="Curio Spice Kit Packaging" className="w-full h-auto" />
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E1AD01] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4A5D4E] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700" />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-950 mb-4 font-outfit">Cooking without the clutter.</h2>
            <p className="text-slate-600 max-w-xl mx-auto">No more $15 jars of spices you'll only use once. Curio is built for the way you actually cook.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Authentic Ingredients", text: "From Szechuan Facing Heaven chiles to Peruvian Aji Amarillo, we source the real thing.", color: "bg-[#C05E42]" },
              { icon: Zap, title: "Exact Portions", text: "Pre-measured for one recipe. No measuring spoons, no half-empty jars, no waste.", color: "bg-[#E1AD01]" },
              { icon: Leaf, title: "Eco-Friendly", text: "100% compostable sachets and mailbox-friendly flat-pack shipping.", color: "bg-[#4A5D4E]" }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                <div className={`${benefit.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3 font-outfit">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-[#C05E42] rounded-full flex items-center justify-center text-white font-bold text-lg">C</div>
            <span className="text-xl font-bold tracking-tight text-slate-950 font-outfit">Curio</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Curio Spice Kits. All rights reserved.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-950 transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-slate-950 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}