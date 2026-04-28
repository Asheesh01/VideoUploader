"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
function page() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("");
    const[consfirmpassword,setconfirmPassword]=useState("");
    const router=useRouter();
  return (
    <div>pagec</div>
  )
}

export default page