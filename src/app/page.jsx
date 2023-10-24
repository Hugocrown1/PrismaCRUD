'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [records, setRecords] = useState([])
  

  useEffect(() => {
    fetch("/api/registros", {})
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        setRecords(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  
    
  }, [])
  
  return (
   <main className=" flex justify-center mx-auto max-w-7xl  p-5 ">
    <table className='w-[70%] h-fit bg-white rounded-md'>
      <thead className='bg-slate-600 p-12'>
        <tr className='p-12'>
          <td>ID</td>
          <td>Nombre</td>
          <td>Genero</td>
          <td>Edad</td>
          <td>Carrera</td>
        </tr>
      </thead>
      <tbody>
        {records.map(student => (<tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.nombre}</td>
          <td>{student.genero}</td>
          <td>{student.edad}</td>
          <td>{student.carrera}</td>

        </tr>))}
      </tbody>
    </table>
   </main>
  )
}
