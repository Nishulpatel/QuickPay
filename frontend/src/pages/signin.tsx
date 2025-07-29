import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { WarningButton } from '../components/WarningButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKRND_URL } from '../config'

export function Signin() {

    const navigate = useNavigate()
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () => {
        try {
            const res = await axios.post(`${BACKRND_URL}/api/v1/user/signin`, {
                username,
                password
            })
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
        } catch(e){
            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.message || 'Signin failed')
              } else {
                alert('An unexpected error occurred')
         }
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400">
            <div className="flex flex-col items-center">
                <div className="w-96 text-center rounded-xl bg-white shadow-lg border border-slate-200 px-8 py-6">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"enter info to login account"} />

                    <InputBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} label={"email"} placeholder={"enter email"}/>

                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }}  label={"password"} placeholder={"enter password"}/>

                    <div className='pt-4'>
                        <Button label={"Signin"} onClick={handleSignin} />
                    </div>
                    <WarningButton label={"Don't have an account"} buttonText={"signup"} to="/signup" />
                </div>
            </div>
        </div>
    )

}