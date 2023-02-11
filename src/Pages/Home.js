import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem('info'))
    useEffect(()=>{
        if(!user)navigate('/')
      },[])
  return (
    <div className='container'>
        <div className='homenav'>
            <div className='navbrand'>ᗷᒪOGIᑎ</div>
            <div className='d-flex flex-wrap align-items-center navbtns' >
                <button className='btn btn-light navbtn' onClick={()=>{navigate('/home')}}>Home</button>
                <button className='btn btn-light navbtn' onClick={()=>{navigate('create')}}>Create a post</button>
                <button className='btn btn-light navbtn' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" >Profile</button>
                <button className='btn btn-light navbtn' onClick={()=>{
                    localStorage.removeItem('info')
                    navigate('/')
                }}><i className="bi bi-box-arrow-right logoutbtn" style={{marginLeft:'5px'}}></i></button>
            </div>
        </div>
        <Outlet/>
        


        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Profile</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
          <div className='d-flex align-items-center flex-column '>
            <img className='canvasimg' src={user.profilepic}></img>
            <div className='profilename'>{user.name}</div>
            <div className='profilename'>{user.email}</div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Home

