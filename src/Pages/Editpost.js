import { Button, TextField} from '@mui/material'
import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import JoditEditor from 'jodit-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Editpost = () => {
    const user=JSON.parse(localStorage.getItem('info'))
    const navigate=useNavigate()
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    const editor1=useRef(null)
    const [content,setContent]=useState('')
    const {postid}=useParams()
    
    const notifysuccess=()=> toast.success("Updated Successfully!")
    const notifyerror= () => toast.error("Something went wrong!!")

    
    const [postpic,setPostpic]=useState()
    const initialValues={
        title:'',
        description:'',
        content,
        postpic
    }

    const validate=(values)=>{
        let errors={}
        if(!values.title)errors.title='Required*'
        if(!values.description)errors.description='Required*'
        return errors;
        }

    const onSubmit=(values)=>{
        values.content=content
        values.postpic=postpic
        async function post(){
            try {
                setDisp('none')
                await axios.put('http://localhost:8000/post/updatepost',{
                ...values,postid
            },{
                headers:{
                    "access-token":user.token
                }
            }).then(res=>{
                notifysuccess()
                setTimeout(() => {
                    navigate(-1)
                }, 1000);
                setDisp('')
            })
            } catch (error) {
                notifyerror()
                setDisp('')
                console.log(error)
            }
           }
           post()
      }

      function postimg(file){
        setDisp('none')
        if(file.type=='image/jpeg' || file.type=='image/png'){
            const data=new FormData()
            data.append('file',file)
            data.append('upload_preset','chat_app')
            data.append('cloud_name','likhithkumar')
            fetch('https://api.cloudinary.com/v1_1/likhithkumar/image/upload',{
                method:'post',
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setPostpic(data.url)
                setDisp('')
            })
        }
        else{
            console.log('Invalid type')
        }
      }
      
    const formik=useFormik({
        initialValues,
        validate,
        onSubmit
    })
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
                formik.values.title=x.data.title
                formik.values.description=x.data.description
                setContent(x.data.content)
                setDisp('')
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='d-flex flex-column align-items-center'>
    <div className='d-flex justify-content-center' style={{width:'100%'}}>
        <Formik>
            <Form onSubmit={formik.handleSubmit} className='form'  >
                <div className="welcome">Edit The Post</div>
                <div className="cinpbox">
                <TextField className='textinp'  type={'title'} label='Enter title' value={formik.values.title} name={'title'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'  />
                    <div >{formik.errors.title && formik.touched.title?<div className="error">{formik.errors.title}</div>:null}</div>
                </div>
                <div className='cinpbox'>
                      <label style={{fontWeight:'500'}}>Upload pic</label>
                      <input type={'file'} className='form-control'  onChange={e=>postimg(e.target.files[0])}/>
                </div>
                <div className="cinpbox">
                    <textarea className='textinp' style={{width:'100%',border:'1px solid #aaa'}} rows='3' placeholder={'Enter description'} value={formik.values.description} name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <div>{formik.errors.description && formik.touched.description?<div  className="error">{formik.errors.description}</div>:null}</div>
                </div>
                <div className='cinpbox'>
                <label style={{fontWeight:'500'}}>Enter Content</label>
                <JoditEditor 
                ref={editor1}
                value={content}
                onChange={newcontent=>setContent(newcontent)}
                />
                </div>
                <Button variant='contained'  type='submit' className="postbtn cinpbox" style={styles1}>Update</Button>
                <Button variant="contained" className="postbtn cinpbox" type="button" style={styles2}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </Button>
            </Form>
        </Formik>
        <ToastContainer/>
    </div>
    </div>
  )
}

export default Editpost