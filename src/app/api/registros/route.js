import { NextResponse } from "next/server";

import { prisma } from '@/libs/prisma' 

export async function GET() {

    try {
        const estudiantes = await prisma.estudiante.findMany()
        return NextResponse.json(estudiantes)
        
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json(error.message , {status: 500})
        
    } 

   
}

export async function POST(request) {
    try {
        const {nombre, genero, edad, carrera} = await request.json()

    const response = await prisma.estudiante.create({
        data: {
            nombre,
            genero,
            edad,
            carrera
        }
    })

    return NextResponse.json(response)
        
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json(error.message , {status: 500})
        
    }

    
}

