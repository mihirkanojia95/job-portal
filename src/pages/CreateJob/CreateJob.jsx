// src/components/Login.js
import React, { useState } from 'react';
import './styles.css'
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const CreateJob = () => {
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [description, setDescription] = useState('');

    const reset = () => {
        setCompanyName('')
        setPosition('')
        setLocation('')
        setJobType('')
        setDescription('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const job = {
                companyName,
                position,
                location,
                type: jobType,
                imageSrc: '',
                description,
                createdAt: Timestamp.fromDate(new Date())
            }
            await addDoc(collection(db, "jobs"), job);
            alert("Job application is created successfully");
            reset();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    };

    return (
        <div className='create-job-container'>
            <h2>Create a Job Application</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={companyName}
                    className='job-input' 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    placeholder="Company" 
                    required 
                />
                 <input 
                    type="text" 
                    value={position}
                    className='job-input' 
                    onChange={(e) => setPosition(e.target.value)} 
                    placeholder="Position" 
                    required 
                />
                 <input 
                    type="text" 
                    value={location}
                    className='job-input' 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Location" 
                    required 
                />
                <select required className='job-input'  value={jobType} onChange={((e) => setJobType(e.target.value))}>
                    <option value="">Select Job Type</option>
                    <option value={"full_time"}>Full time</option>
                    <option value="part_time">Part time</option>
                </select>
                 <textarea 
                    value={description}
                    className='job-input' 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description" 
                    required 
                />
                <button type="submit" className='btn'>Create</button>
            </form>
        </div>
    );
};

export default CreateJob;
