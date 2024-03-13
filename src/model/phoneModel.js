import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'phonebook'
});

class Phone extends Model {}

Phone.init({
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    name: {
        type: DataTypes.STRING
      },
    mobileno: {
        type: DataTypes.BIGINT, 
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Phone'
});


(async () => {
    try {
        await sequelize.sync();
        console.log('Phone table linked successfully!');
    } catch (error) {
        console.error('Unable to create table:', error);
    }
})();

export default Phone;
