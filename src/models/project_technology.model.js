// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectTechnologyModel = sequelize.define(
  "ProjectTechnology",
  {
    // TODO: 1. id: entero, clave primaria y autoincremental.
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // TODO: 2. project_id: entero, obligatorio, clave foránea hacia Project.
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    // TODO: 3. technology_id: entero, obligatorio, clave foránea hacia Technology.
    technology_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Technologies",
        key: "id",
      },
    },
  },
  {
    // TODO: 4. Desactivar las columnas createdAt y updatedAt.
    timestamps: false,
  },
);