"use client"
import Link from "next/link";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(!menu);
      };
  return (
    <>
    <nav className=' flex items-center mb-2 justify-between bg-slate-800'>
    <Link href={"/Homepage"} className=" text-blue-600 italic">Accolade Tech</Link>
  
<div className=' flex flex-col items-center'><RiMenu3Fill onClick={toggleMenu} className=' text-xl md:hidden'/>

</div>

  </nav>
  {
    menu && (
        <ul className='bg-slate-800 '>
            <li>All countries</li>
            <li>Login</li>
        </ul>
    )
}
  </>
  )
}

export default Navbar