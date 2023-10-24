"use client";
import Modal from "@/components/Modal";
import StudentForm from "@/components/StudentForm";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [editedStudent, setEditedStudent] = useState({});
  const [deletedStudent, setDeletedStudent] = useState({});

  const fetchStudents = () => {
    fetch("/api/registros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const saveStudent = async (student) => {
    if (!student.id) {
      await fetch("/api/registros", {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
          "Content-type": "application/json",
        },
      });
    } else {
      await fetch("/api/registros/" + student.id, {
        method: "PUT",
        body: JSON.stringify(student),
        headers: {
          "Content-type": "application/json",
        },
      });
      setEditedStudent({});
    }

    fetchStudents();
  };

  const editStudent = (student) => {
    setEditedStudent(student);
    setShowModalEdit(true);
  };

  const deleteStudent = async () => {
    await fetch("/api/registros/" + deletedStudent.id, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json",
      },
    });
    setDeletedStudent({});
    fetchStudents();
  };

  return (
    <main className=" flex justify-center mx-auto max-w-7xl  p-5 ">
      <section className="w-[80%] mt-8">
        <button
          className="flex items-center justify-center bg-[#9d4edd] w-full px-12 py-3 text-white font-semibold text-lg rounded-lg mb-4"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-2">Agregar nuevo estudiante</span>
          <IconPlus />
        </button>
        <table className="w-full border-collapse bg-white table-auto rounded-md overflow-hidden ">
          <thead className="bg-[#e5e5e5]">
            <tr className="font-semibold">
              <td className="py-2">ID</td>
              <td>Nombre</td>
              <td>Genero</td>
              <td>Edad</td>
              <td>Carrera</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr className="border-y border-slate-600/10" key={student.id}>
                <td>{student.id}</td>
                <td>{student.nombre}</td>
                <td>{student.genero}</td>
                <td>{student.edad}</td>
                <td>{student.carrera}</td>
                <td className="flex">
                  <button
                    className="bg-[#9d4edd] table-button"
                    onClick={() => editStudent(student)}
                  >
                    <IconEdit /> Editar
                  </button>
                  <button
                    className="bg-[#ff6d00] table-button"
                    onClick={() => {
                      setDeletedStudent(student);
                      setShowModalDelete(true);
                    }}
                  >
                    <IconTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isVisible={showModal}>
          <h2 className="text-2xl font-bold text-center my-4">
            Nuevo estudiante
          </h2>
          <StudentForm
            saveStudent={saveStudent}
            onClose={() => setShowModal(false)}
          />
        </Modal>

        <Modal isVisible={showModalEdit}>
          <h2 className="text-2xl font-bold text-center my-4">
            Editar estudiante
          </h2>
          <StudentForm
            saveStudent={saveStudent}
            onClose={() => setShowModalEdit(false)}
            {...editedStudent}
          />
        </Modal>

        <Modal isVisible={showModalDelete}>
          <h2 className="text-2xl font-bold text-center my-4">
            Eliminar a {deletedStudent.nombre}?
          </h2>
          <div className="flex space-x-6">
            <button
              type="button"
              className="bg-[#9d4edd] px-4 py-2 text-white font-semibold rounded-md w-full"
              onClick={() => {
                deleteStudent();
                setShowModalDelete(false);
              }}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="bg-[#ff6d00] px-4 py-2 text-white font-semibold rounded-md w-full"
              onClick={() => {
                setDeletedStudent({});
                setShowModalDelete(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      </section>
    </main>
  );
}
