// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { matchedData } from "express-validator";
import { use } from "react";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = matchedData(req, {
      locations: ["body"],
    });
    // TODO: 1. Hashear la password antes de guardarla (hashPassword).
    const passwordHash = await hashPassword(password);
    // TODO: 2. Crear el user y su profile asociado.
    const user = await UserModel.create({
      username,
      email,
      password: passwordHash,
      role,
    });
    await ProfileModel.create({
      ...profile,
      user_id: user.id,
    });
    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.

    return res.status(201).json({
      menssage: "el usuaria se ha creado correctamente",
      data: { username, email, role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    const existingUser = await UserModel.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({ message: "credencial invalida" });
    }
    const contraseñaValida = await comparePassword(
      password,
      existingUser.password,
    );
    if (!contraseñaValida) {
      return res.status(401).json({ message: "credencial invalida" });
    }
    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    const token = signToken({user_id: existingUser.id , role: existingUser.role});
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    res.cookie("token" , token , {
      httpOnly: true, 
      maxAge: 1000 
    })
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
    return res.status(401).json({ message: "login exitoso" })
    console.log(email, password);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(204).send();
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
