import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import JobCard from '../../components/JobCard/JobCard';
import { doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase-config';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '30%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0,0 , 0.75)'
  }
};


const Home = () => {
    const [allJobs, setAllJobs] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const { userData } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
       const getAllJobs = async () => {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllJobs(results);
       }
       getAllJobs();
    }, [])

    console.log(allJobs)

    const reset = () => {
        setName('')
        setEmail('')
        setPhoneNo('')
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "users", userData.id);
            const jobRef = doc(db, "jobs", selectedId);

            await updateDoc(userRef, {
                appliedToIds: arrayUnion(selectedId)
            });
            await updateDoc(jobRef, {
                appliedBy: arrayUnion({
                    name,
                    email,
                    phoneNumber: phoneNo
                })
            });
            alert('You have successfully applied for this job');
            reset();
            navigate(0)
          } catch (e) {
            console.error("Error while applying: ", e);
          }
    }

    const onApplyHandler = async(jobId) => {
        setSelectedId(jobId)
        openModal();
    }

    const filteredList = useMemo(() => {
       if(searchQuery.length){
           return allJobs.filter((job) => (
            job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
           ))
       }
       return allJobs
    }, [allJobs, searchQuery])

    return (
        <div className='home-container'>
            <div className='search'>
               <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by title, company and location' />
            </div>
            <h2>{filteredList.length} Jobs</h2>
            {
                filteredList.map((job) => <JobCard 
                key={job.id}
                 {...job} 
                 onApplyHandler={onApplyHandler} 
                 isAdmin={userData?.isAdmin}
                 applied={userData?.appliedToIds?.includes(job.id)}
                  />)
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='close'>
                    <IoClose size={24} onClick={closeModal} />
                </div>
                <form onSubmit={onSubmit} className='form-container'>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='form-input' />
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='form-input' />
                    <input required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder='Phone number' className='form-input' />
                    <button className='form-btn' type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default Home;
