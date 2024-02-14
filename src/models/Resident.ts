
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Resident extends Model {
  public id!: number;
  public name!: string;
  public birth_year!: number;
  public death_year!: number | null;
}

Resident.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    death_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Resident',
  }
);

export default Resident;
