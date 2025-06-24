import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate, Link } from 'react-router-dom'
import {motion}from 'framer-motion'
import './Signup.css';
export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert('✅ Signup successful! Please log in.')
      navigate('/') // Redirect to login page
    } catch (error) {
      alert('❌ Signup failed: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black px-4">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black border border-purple-700 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">
          Create Your CrowdShield Account
        </h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 mb-5 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 mb-5 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-5 py-3 mb-6 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign up
        </motion.button>

        <p className="text-sm mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-purple-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}