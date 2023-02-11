import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const Posts = () => {
    const user=JSON.parse(localStorage.getItem('info'))
    const [posts,setPosts]=useState([])
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        try {
            setDisp('none')
            await axios.get('https://blogappbe.onrender.com/post/getallposts',{
                headers:{
                    "access-token":user.token
                }
            })
            .then(x=>{
                setPosts(x.data.reverse())
                setDisp('')
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div style={styles1}>
            {posts.map(post=>(
                <Post key={post._id} post={post} user={user}/>
            ))}
        </div>
        <div className="text-center spn" style={styles2}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Posts

function Post({post,user}){
    return(
        <div className='post'>
            <div className='postim' ><Link to={`postpage/${post._id}`}><img className='postpic' src={post.postpic}/></Link></div>
            <div className='postinfo' >
                <Link to={`postpage/${post._id}`} style={{textDecoration:'none',color:'black'}}><h2 className='posttitle'>{post.title}</h2></Link>
                <div className='authorinfo'>
                    <span className='author'>by {post.author._id===user._id?"You":post.author.name}</span>    
                    <span className='timeago'>{format(post.createdAt)}</span>
                </div>
                <div className='postdesc'>{post.description}</div>
            </div>
        </div>
    )
}
/*
<div className='post'>
            <div className='postim' ><img className='postpic' src='https://techcrunch.com/wp-content/uploads/2023/02/20230201-Key-vision-1-copy.jpg?w=1390&crop=1'/></div>
            <div className='postinfo' >
                <h2 className='posttitle'>DJI’s Mini 2 SE ultraportable drone takes to the skies</h2>
                <div className='authorinfo'>
                    <span className='author'>by Author</span>    
                    <span>1 hour ago</span>
                </div>
                <div className='postdesc'>It’s a couple of years since DJI first launched its Mavic Mini, and last year it brought the Mini 3 Pro. It’s utterly confusing why the current drone is called the Mini 2 SE, but in any case, it’s the newest flying creature in the hovering menagerie that is the DJI lineup.</div>
            </div>
        </div>
*/