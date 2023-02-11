import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate=useNavigate()

    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }

    const notifysuccess=()=> toast.success("Signed Up Successfully!")
    const notifyuserexist= () => toast.error("User Already Exist!")

    const initialValues={
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    }

    const validate=(values)=>{
        let errors={}
        if(!values.name)errors.name='Required*'
        if(!values.email)errors.email='Required*'
        if(!values.password)errors.password='Required*'
        if(!values.confirmpassword)errors.confirmpassword='Required*'
        if(values.password!=values.confirmpassword)errors.confirmpassword="Password didn't matched!"
        return errors;
    }

    const onSubmit=(values)=>{
        //values.profilepic=profilepic
       async function signup(){
        try {
            setDisp('none')
            await axios.post('http://localhost:8000/register/signup',{
            ...values
        }).then(res=>{
            notifysuccess()
            setTimeout(() => {
                navigate('/')
            }, 1000);
            setDisp('')
        })
        } catch (error) {
            notifyuserexist()
            setDisp('')
            console.log(error)
        }
       }
       signup()
      }
      
    const formik=useFormik({
        initialValues,
        validate,
        onSubmit
    })
  return (
    <div className='container-fluid logincont'>
        <div className='brand'>ᗷᒪOGIᑎ</div>
        <Formik>
            <Form onSubmit={formik.handleSubmit} className='form'  >
                <div className="welcome">SIGNUP</div>
                <div className="inpbox">
                    <TextField className='textinp' variant="outlined" type={'text'} label={'Enter Name'} value={formik.values.name} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'></TextField>
                    <div>{formik.errors.name && formik.touched.name?<div  className="error">{formik.errors.name}</div>:null}</div>
                </div>
                <div className="inpbox">
                <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small' ></TextField>
                    <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                </div>
                <div className="inpbox">
                    <TextField className='textinp' variant="outlined" type={'password'} label={'Enter Password'} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'></TextField>
                    <div>{formik.errors.password && formik.touched.password?<div  className="error">{formik.errors.password}</div>:null}</div>
                </div>
                <div className="inpbox">
                    <TextField className='textinp' variant="outlined" type={'password'} label={'Confirm Password'} value={formik.values.confirmpassword} name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'></TextField>
                    <div>{formik.errors.confirmpassword && formik.touched.confirmpassword?<div  className="error">{formik.errors.confirmpassword}</div>:null}</div>
                </div>
                <Button variant='contained' type='submit' className="loginbtn b1" style={styles1}>Signup</Button>
                <Button variant="contained" className="loginbtn b2" type="button" style={styles2}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </Button>
                <div>Already have an account? <Link to={'/'} style={{textDecoration:'none'}}>Login</Link></div>
            
            </Form>
        </Formik>
            <ToastContainer/>
    </div>
  )
}

export default Signup