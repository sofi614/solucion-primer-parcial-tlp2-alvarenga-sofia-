// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { matchedData } from "express-validator";
import { use } from "react";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    // TODO: 1. Hashear la password antes de guardarla (hashPassword).
    const hashedPassword = await hashPassword(password);

    // TODO: 2. Crear el user y su profile asociado.
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await ProfileModel.create({ ...profile, user_id: user.id });

    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.
    const createdUser = await UserModel.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: ProfileModel, as: "profile" }],
    });
    return res
      .status(201)
      .json({ msg: "Usuario registrado con éxito", data: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    const user = await UserModel.findOne({ where: { email } });
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    const token = signToken({ id: user.id, role: user.role });

    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ msg: "Inicio de sesión exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
    res.clearCookie("token");
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};