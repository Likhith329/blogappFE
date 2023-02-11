import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'timeago.js'

const Postpage = () => {
    const {postid}=useParams()
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem('info'))
    const [post,setPost]=useState({})
    const [disp,setDisp]=useState('')
    const [disp2,setDisp2]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    const styles3={
        display:disp2
    }
    const styles4={
        display:disp2==''?'none':''
    }


    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        try {
            setDisp('none')
            await axios.get(`http://localhost:8000/post/getpost/${postid}`,{
                headers:{
                    "access-token":user.token
                }
            })
            .then(x=>{
                setPost(x.data)
                setDisp('')
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handledelete=()=>{
        async function deleteitem(){
          try {
              setDisp2('none')
              await axios.delete('http://localhost:8000/post/deletepost', {
                headers: {
                  "access-token":user.token
                },
                data: {
                  postid:postid
                }
              }).then(res=>{
                navigate('/home')
              setDisp2('')
          })
          } catch (error) {
              setDisp('')
              console.log(error)
          }
         }
         deleteitem()
      }
  return (
    <div>
        <div className='container postpage' style={styles1}>
            <h1 className='posttitle ptitle'>{post.title}</h1>
            <div className='d-flex justify-content-between' style={{width:'100%'}}>
                <span className='author'>by {post.author?._id===user._id?"You":post.author?.name}</span>
                {post.author?._id===user._id?
                <div>
                    <span><button className='btn btn-secondary editbtn' onClick={()=>{navigate(`/home/editpost/${post._id}`)}}><i className="bi bi-pencil-square"></i> Edit</button></span>
                    <span>
                        <button className='btn btn-secondary editbtn' onClick={handledelete} style={styles3}><i className="bi bi-trash3"></i>Delete</button>
                        <button  className="btn btn-secondary editbtn"  style={styles4}>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </span>

                </div>:''}
                <span className='timeago'>{format(post.createdAt)}</span>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <img className='ppic' src={post.postpic}/>
            </div>
            <div className='content' dangerouslySetInnerHTML={{__html:post.content}}></div>
        </div>
        <div className="text-center spn" style={styles2}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Postpage