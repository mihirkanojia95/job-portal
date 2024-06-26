import React from 'react'
import './styles.css'
import { convertToDate } from '../../utils/date';
import LogoImg from '../../images/logo.svg'
import { Link } from 'react-router-dom';

const getCountString = (len) => len === 1 ? 'Application' : 'Applications' 

const JobCard = ({ 
   id,
   type,
   imageSrc, 
   applied,
   companyName,
   position,
   appliedBy,
   location,
   createdAt,
   description,
   isAdmin,
   onApplyHandler
 }) => {
    return (
        <div className='job-card-container'>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/job-detail/${id}`}>  
            <img src={imageSrc || LogoImg} width={100} height={100} alt="job" />
            <div className='details'>
                    <h3>{companyName}</h3>
                    <h2>{position}</h2>
                    <div className='bullet-points'>
                        <div className='item'>
                            <span>{location}</span>
                        </div>
                        <span>.</span>
                        <div className='item'>
                            <span>{type.split('_').join(' ')}</span>
                        </div>
                        <div className='item'>
                            <span>{convertToDate(createdAt)}</span>
                        </div>
                        {
                            isAdmin && appliedBy?.length && (
                                <>
                                <span>.</span>
                                <div className='item'>
                                    <span>{appliedBy?.length} {getCountString(appliedBy.length)}</span>
                                </div>
                                </>
                               
                            )
                        }
                    </div> 
                    <p>
                        {description}
                    </p>    
                  
            </div>
            </Link>
            {
                    !isAdmin && (
                        <div className='apply-container'>
                        {
                            applied ? <span>Applied</span> : <button onClick={() => onApplyHandler(id)}>Apply</button>
                        }
                    </div>
                    ) 
            }  
        </div>
    )
}

export default JobCard;