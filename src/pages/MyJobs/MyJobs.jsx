import React, { useEffect, useState } from 'react';
import './styles.css';
import JobCard from '../../components/JobCard/JobCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useAuth } from '../../context/AuthContext';

const MyJobs = () => {
    const [myJobs, setMyjobs] = useState([])
    const { userData } = useAuth()

    useEffect(() => {
       const getMyJobs = async () => {
        const jobRef = collection(db, "jobs");
        const q = query(jobRef, where('__name__', "in", userData?.appliedToIds));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyjobs(results);
       }
       if(userData?.appliedToIds?.length){
        getMyJobs();
       }
    }, [userData?.appliedToIds])

    return (
        <div className='my-jobs-container'>
            {
                myJobs.map((job) => <JobCard 
                key={job.id}
                 {...job}  
                 isAdmin={userData?.isAdmin}
                 applied
                />)
            }
            {myJobs.length === 0 && <h3>You have not applied to any jobs yet</h3> }
        </div>
    );
};

export default MyJobs;