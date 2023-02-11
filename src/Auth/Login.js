import { Button, TextField} from '@mui/material'
import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

    const navigate=useNavigate()

    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }

    const notifysuccess=()=> toast.success("Login Successfull!")
    const notifyinvalid= () => toast.error("Invalid Email or Password!")

    const initialValues={
        email:'',
        password:'',
    }

    const validate=(values)=>{
        let errors={}
        if(!values.email)errors.email='Required*'
        if(!values.password)errors.password='Required*'
        return errors;
        }

    const onSubmit=(values)=>{
        async function Login(){
            try {
                setDisp('none')
                await axios.post('http://localhost:8000/register/signin',{
                ...values
            }).then(res=>{
                localStorage.setItem('info',JSON.stringify(res.data))
                notifysuccess()
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
                setDisp('')
            })
            } catch (error) {
                notifyinvalid()
                setDisp('')
                console.log(error)
            }
           }
           Login()
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
                <div className="welcome">LOGIN</div>
                <div className="inpbox">
                <TextField className='textinp'  type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'  ></TextField>
                    <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                </div>
                <div className="inpbox">
                    <TextField className='textinp'   type={'password'} label={'Enter Password'} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth size='small'></TextField>
                    <div>{formik.errors.password && formik.touched.password?<div  className="error">{formik.errors.password}</div>:null}</div>
                </div>
                <Button variant='contained' type='submit' className="loginbtn b1" style={styles1}>Login</Button>
                <Button variant="contained" className="loginbtn b2" type="button" style={styles2}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </Button>
                <div>Don't have an account? <Link to={'/signup'} style={{textDecoration:'none'}}>Signup</Link></div>
            
            </Form>
        </Formik>
            <ToastContainer/>
    </div>
  )
}

export default Login