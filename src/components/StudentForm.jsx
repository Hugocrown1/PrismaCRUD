import React, { useState } from "react";

const StudentForm = ({
  saveStudent,
  onClose,
  id,
  nombre: existingName,
  genero: existingGender,
  edad: existingAge,
  carrera: existingCareer,
}) => {
  const [name, setName] = useState(existingName || "");
  const [gender, setGender] = useState(existingGender || "");
  const [age, setAge] = useState(existingAge || "");
  const [career, setCareer] = useState(existingCareer || "");

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      id,
      nombre: name,
      genero: gender,
      edad: parseFloat(age),
      carrera: career,
    };

    saveStudent(student);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleCancel}
      className="flex flex-col mx-auto max-w-lg"
    >
      <input
        required
        placeholder="Nombre"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        required
        className={`${gender === "" ? "text-[#9CA3AF]" : "text-black"}`}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option className="text-gray-500" value="" disabled>
          Genero
        </option>

        <option className="text-black" value="Masculino">
          Masculino
        </option>
        <option className="text-black" value="Femenino">
          Femenino
        </option>
      </select>
      <div className="flex-col w-full mb-4">
        <input
          className="mb-0 w-full"
          required
          placeholder="Edad"
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        {(parseFloat(age) <= 0 || parseFloat(age) >= 200) && (
          <span className="mb-2 ml-1 font-medium text-red-600">
            Introduzca una edad válida
          </span>
        )}
      </div>

      <input
        required
        placeholder="Carrera"
        type="text"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
      />
      <div className="flex justify-center space-x-4 mb-4">
        <button
          type="submit"
          disabled={parseFloat(age) <= 0 || parseFloat(age) >= 200}
          className="bg-[#9d4edd] px-4 py-2 text-white font-semibold rounded-md w-full disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          Enviar
        </button>
        <button
          type="reset"
          className="bg-[#ff6d00] px-4 py-2 text-white font-semibold rounded-md w-full"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
