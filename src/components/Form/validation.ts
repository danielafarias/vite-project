import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .matches(/^[A-Za-z\s]+$/, "O nome não pode conter números"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),
  cep: yup
    .string()
    .required("O CEP é obrigatório")
    .matches(/^\d{8}$/, "O CEP deve conter 8 dígitos"),
});