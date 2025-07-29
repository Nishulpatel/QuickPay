import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { WarningButton } from '../components/WarningButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKRND_URL } from '../config'
export function Signup() {

    const navigate = useNavigate()
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
          const res = await axios.post(`${BACKRND_URL}/api/v1/user/signup`, {
            username,
            firstname: firstName, 
            lastname: lastName,   
            password,
          })
          localStorage.setItem("token", res.data.token)
          navigate("/dashboard")
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data || error.message)
            alert(error.response?.data?.message || 'Signup failed. Please try again!')
          } else {
            console.error('Unexpected error:', error)
          }
        }
      }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400">
            <div className="flex flex-col items-center">
                <div className="w-96 text-center rounded-xl bg-white shadow-lg border border-slate-200 px-8 py-6">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"enter info to create account"} />

                    <InputBox onChange={(e) =>{
                        setFirstName(e.target.value);
                    }} label={"Firstname"} placeholder={"enter first name"}/>

                    <InputBox onChange={(e) =>{ 
                        setLastName(e.target.value);
                    }} label={"lastname"} placeholder={"enter last name"}/>

                    <InputBox onChange={(e) =>{
                        setUsername(e.target.value);
                    }} label={"email"} placeholder={"enter email"}/>

                    <InputBox onChange={(e) =>{
                        setPassword(e.target.value);
                    }} label={"password"} placeholder={"enter password"}/>

                    <div className='pt-4'>
                        <Button label={"Signup"} onClick={handleSignup} />
                    </div>
                    <WarningButton label={"Already have account"} buttonText={"signin"} to="/signin" />
                </div>
            </div>
        </div>
    )
}