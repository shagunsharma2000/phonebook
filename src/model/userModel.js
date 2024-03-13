import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'Phonebook'
});



class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
 
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
}
}, {
  sequelize,
  modelName: 'user'
});

(async () => {
  try {
      await sequelize.sync();
      console.log('user table linked successfully!');
  } catch (error) {
      console.error('Unable to create table:', error);
  }
})();

export default User;
