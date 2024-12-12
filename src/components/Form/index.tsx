import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { validationSchema } from "./validation";
import { User } from "../../interfaces/global.interface";

interface FormData {
  name: string;
  email: string;
  cep: string;
}

interface FormProps {
  onRefresh: () => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}
  
  const Form = ({ onRefresh, editingUser, setEditingUser }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (editingUser) {
      setValue("name", editingUser.name);
      setValue("email", editingUser.email);
      setValue("cep", editingUser.cep);
    }
  }, [editingUser, setValue]);

  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, data);
        setEditingUser(null);
      } else {
        await api.post("/users", data);
      }
      onRefresh();
      reset();
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao enviar dados");
    }
  };

  const fetchCep = async (cep: string) => {
    if (!/^\d{8}$/.test(cep)) return;
    try {
      const { data } = await api.get(`/cep/${cep}`);
      setValue("cep", data.cep);
    } catch {
      setMessage("CEP inválido ou não encontrado");
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.Input {...register("name")} placeholder="Nome" />
      {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}

      <S.Input {...register("email")} placeholder="Email" />
      {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}

      <S.Input
        {...register("cep")}
        placeholder="CEP"
        onBlur={(e) => fetchCep(e.target.value)}
      />
      {errors.cep && <S.ErrorMessage>{errors.cep.message}</S.ErrorMessage>}

      <S.Button type="submit">{editingUser ? "Editar" : "Cadastrar"}</S.Button>
      {message && <S.ErrorMessage>{message}</S.ErrorMessage>}
    </S.FormContainer>
  );
};

export default Form;
