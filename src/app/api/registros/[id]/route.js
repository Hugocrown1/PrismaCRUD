import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma' 


export async function GET(request, {params: {id}}){
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })

        if(!estudiante) {
            return NextResponse.json({mensaje})
        }
        
        return NextResponse.json(estudiante)
        
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json(error.message , {status: 500})
    }
   
}

export async function DELETE(request, {params: {id}}){

    try {
        const response = await prisma.estudiante.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json(response)
        
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json(error.message , {status: 500})
        
    }

}

export async function PUT(request, {params: {id}}){
    try {
        const {nombre, genero, edad, carrera} = await request.json()
        const updatedStudent = await prisma.estudiante.update({
            where: {
                id: Number(id)

            },
            data: {
                nombre,
                genero,
                edad,
                carrera
            }
        })

        return NextResponse.json(updatedStudent)
        
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json(error.message , {status: 500})
        
    }
}


