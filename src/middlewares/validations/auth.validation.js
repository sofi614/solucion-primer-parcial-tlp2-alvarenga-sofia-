// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
    .notEmpty()
    .withMessage("el campo con el nombre usuario no debe de estar vacio"),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email")
    .notEmpty()
    .withMessage("el campo con el  nombre email no debe de estar vacio"),
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("password")
    .notEmpty()
    .withMessage("el campo con el nombre contraseña no debe de estar vacio"),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  body("role")
    .optional()
    .custom(async (role) => {
      if (role !== "developer" && role !== "administrador") {
        throw new Error("el rol no es valido");
      }
      return;
    }),
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  body("profile.employee_number")
    .notEmpty()
    .withMessage("el campo con el  nombre email no debe de estar vacio"),
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  body("profile.first_name")
    .notEmpty()
    .withMessage("el nombre del perfil no debe de estar vacio"),
  body("profile.last_name")
    .notEmpty()
    .withMessage("el apellido del perfil del usuario no debe de estar vacio"),
  body("profile.phone").optional(),
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body("email")
    .notEmpty()
    .withMessage("el campo con el  nombre email no debe de estar vacio")
    .isEmail()
    .withMessage("el formato del email no es vaido"),
  // TODO: 8. Validar password: obligatoria.
  body("password")
    .notEmpty()
    .withMessage("el campo con el nombre contraseña no debe de estar vacio"),
];