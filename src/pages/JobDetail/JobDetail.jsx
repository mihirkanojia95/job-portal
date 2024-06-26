import React, { useEffect, useState } from 'react'
import './styles.css'
import { convertToDate } from '../../utils/date';
import LogoImg from '../../images/logo.svg'
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useAuth } from '../../context/AuthContext';

const JobDetail = () => {
    const [job ,setJob] = useState(null)
    const { userData } = useAuth()
    const { id } = useParams();

    useEffect(() => {
        const getJobById = async () => {
            const jobRef = collection(db, "jobs");
            const q = query(jobRef, where('__name__', "==", id));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setJob(results.length ? results[0] : null);
       }

      if(id){
        getJobById()
      }
    }, [id])

    return (
        <div className='job-detail-container'>
            <div className='job-details'>
                   <img src={job?.imageSrc || LogoImg} width={100} height={100} alt="job" />
                   <h3>{job?.companyName}</h3>
                    <h2>{job?.position}</h2>
                    <div className='bullet-points'>
                        <div className='item'>
                            <span>{job?.location}</span>
                        </div>
                        <span>.</span>
                        <div className='item'>
                            <span>{job?.type.split('_').join(' ')}</span>
                        </div>
                        <span>.</span>
                        <div className='item'>
                            <span>{convertToDate(job?.createdAt)}</span>
                        </div>
                    </div> 
                    <p>
                        {job?.description}
                    </p>   
            </div>
                {
                    userData?.isAdmin && job?.appliedBy && job?.appliedBy.length > 0 && (
                    <div className='candidates'>
                        <h4>Application Received:</h4>
                        <div>
                                <span>Name</span>
                                <span>Email</span>
                                <span>Phone number</span>
                        </div>
                            {
                                job?.appliedBy.map((user) => (
                                    <div key={user.email}>
                                        <span>{user.name}</span>
                                        <span>{user.email}</span>
                                        <span>{user.phoneNumber}</span>
                                    </div>
                                ))
                            }
                    </div>
                    )
                }
        </div>
    )
}

export default JobDetail;