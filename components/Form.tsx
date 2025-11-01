import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onSave: (form: FormProps) => void;
}

interface FormProps {
  name: string;
  email: string;
  phone: string;
  termsSAP: boolean;
}

export default function Form({ onSave }: Props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      termsSAP: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("Email no válido")
        .required("El email es obligatorio"),
      phone: Yup.string()
        .length(10, "El telefono debe ser de 10 digitos")
        .required("El telefono es obligatorio"),
      termsSAP: Yup.boolean(),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="absolute top-[790px] font-bold mx-auto w-[65%] rounded-md"
      >
        <div className="mb-[15px] relative">
          <img
            src="/name.svg"
            alt="name icon"
            className="absolute top-[35px] left-10 w-10"
          />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Nombre"
            autoComplete="off"
            style={{
              caretColor: "black",
              border: `${
                formik.touched.name && formik.errors.name ? "2px solid red" : ""
              }`,
            }}
            className="mt-1 block text-[#cad3e5] placeholder-[#cad3e5] bg-[#929bba] w-full text-[40px] h-[85px] p-[60px] pl-[100px] border-[2px] border-white rounded-3xl"
          />
        </div>

        <div className="mb-[15px] relative">
          <img
            src="/email.svg"
            alt="name icon"
            className="absolute top-[43px] left-[35px] w-15"
          />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Correo"
            autoComplete="off"
            style={{
              caretColor: "black",
              border: `${
                formik.touched.email && formik.errors.email
                  ? "2px solid red"
                  : ""
              }`,
            }}
            className="mt-1 block text-[#cad3e5] placeholder-[#cad3e5] bg-[#929bba] w-full text-[40px] h-[85px] p-[60px] pl-[100px] border-[2px] border-white rounded-3xl"
          />
        </div>

        <div className="mb-[16px] relative">
          <img
            src="/phone.png"
            alt="name icon"
            className="absolute top-[25px] left-[35px] w-12"
          />
          <input
            type="number"
            name="phone"
            onChange={(e) => {
              formik.setFieldValue("phone", e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="Celular"
            autoComplete="off"
            style={{
              caretColor: "black",
              border: `${
                formik.touched.phone && formik.errors.phone
                  ? "2px solid red"
                  : ""
              }`,
            }}
            className="mt-1 block text-[#cad3e5] placeholder-[#cad3e5] bg-[#929bba] w-full text-[40px] h-[85px] p-[60px] pl-[100px] border-[2px] border-white rounded-3xl"
          />
        </div>

        <div className="mb-[20px] mt-[45px] flex items-start">
          <input
            type="checkbox"
            name="termsSAP"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.termsSAP ? "termsSAP" : ""}
            className="ml-[76px] mr-8 scale-checkbox"
          />
          <a
            href="https://www.sap.com/latinamerica/about/legal/privacy.html"
            target="_blank"
            rel="noreferrer noopener"
            className="w-full bg-transparent h-[45px]"
          ></a>
        </div>

        <button
          type="submit"
          className={`w-full text-[40px] mt-[90px] text-[#cad3e5] p-[30px] rounded-3xl bg-[#001449]`}
        >
          Comenzar
        </button>
      </form>
    </>
  );
}
