const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('sequelizepractice', 'root', '1234', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        freezeTableName: true   
    }
});

const Country = sequelize.define('country', {
    countryName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

Country.hasOne(Capital, { onUpdate: 'CASCADE' }
//     , { foreignKey: { 
//         name: 'Capitalof',
//         type: DataTypes.INTEGER,
//         allowNull: false
//     } 
// }
);
Capital.belongsTo(Country, { onDelete: 'CASCADE' });

let country, capital;

sequelize.sync({ alter: true }).then(() => {
    return Country.findOne({ where: { countryName: 'France'}});
}).then((data)=> {
    country = data;
    return Capital.findOne({ where: { capitalName: 'London'}})
}).then((data) => {
    capital = data;
    return capital.setCountry(country);
}).then((data)=> {
    console.log(data);
})
.catch((err)=> {
    console.log(err)
})

// sequelize.sync({ alter: true }).then(() => {
//     return Country.destroy({
//         where: {countryName: 'USA'}
//     });
// }).then((data) => {
//     console.log(data.toJSON());
// })
// .catch((err)=> {
//     console.log(err)
// })