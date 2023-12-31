"use client";
import Modal from "@/components/Modal";
import StudentForm from "@/components/StudentForm";
import {
  IconBrandPrisma,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [loadingContent, setLoadingContent] = useState(true);

  const [editedStudent, setEditedStudent] = useState(null);
  const [deletedStudent, setDeletedStudent] = useState(null);

  const [filter, setFilter] = useState("");
  const [studentsList, setStudentsList] = useState([]);

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
        setLoadingContent(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filterStudents = () => {
    const filters = filter.toLowerCase().split(" ");

    return students.filter(({ id, nombre, genero, edad, carrera }) => {
      const attributes = [
        id.toString(),
        nombre,
        genero,
        edad.toString(),
        carrera,
      ]
        .join(" ")
        .toLowerCase();
      return filters.every((filterValue) => attributes.includes(filterValue));
    });
  };

  useEffect(() => {
    const filteredStudents = filterStudents();

    setStudentsList(filteredStudents);
  }, [filter, students]);

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
      setEditedStudent(null);
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
    setDeletedStudent(null);
    fetchStudents();
  };

  return (
    <main className=" flex justify-center mx-auto max-w-7xl  sm:p-5 ">
      <section className=" overflow-x-auto xl:overflow-visible inset-0 relative justify-center w-full lg:w-[80%]  mt-2 ">
        <p className="text-center font-bold text-5xl min-w-[733px] my-6 flex items-center justify-center space-x-2">
          <IconBrandPrisma size={50} />
          <span>Prisma CRUD</span>
        </p>
        <div className="flex items-center justify-between min-w-[733px]">
          <div className="flex items-center space-x-2">
            <label className="mb-2 font-semibold flex" htmlFor="search">
              <IconSearch />
              <span>Buscar: </span>
            </label>
            <input
              className="ring-black ring-1 mb-2"
              id="search"
              placeholder="Nombre, genero, edad, ..."
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button
            className="flex items-center justify-center bg-[#9d4edd] w-fit min-w-[100px] px-6 py-3 text-white font-semibold text-base rounded-lg mb-2"
            onClick={() => setShowModal(true)}
          >
            <span className="mr-2">Agregar nuevo estudiante</span>
            <IconPlus />
          </button>
        </div>
        <table className="min-w-full border-collapse bg-white table-auto rounded-md overflow-hidden ">
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
            {studentsList.map((student) => (
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

        {loadingContent && (
          <svg
            className="absolute w-[10%] translate-x-[420px] -translate-y-96"
            viewBox="25 25 50 50"
          >
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        )}

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
          <h2 className="text-2xl font-bold text-center mt-4 mb-8">
            Eliminar a {deletedStudent?.nombre}?
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
