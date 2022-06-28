const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const bcrypt = require('bcrypt');
const zlib = require('zlib');

const sequelize = new Sequelize('sequelizepractice', 'root', '1234', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        freezeTableName: true   
    }
});

// async function myFunction() {
//     await sequelize.authenticate();
//     console.log("connection success")
// }

// sequelize.authenticate().then(() => {
//     console.log("connection seccessful")
// }).catch((err) => {
//     console.log("Error connecting to database")
// });

// console.log("Another task");

// const Pust = sequelize.define('post', {

// })

sequelize.drop({ match: /_test$/ });

const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [4, 6]
        // }
        get() {
            const rawValue = this.getDataValue('username');
            return rawValue.toUpperCase();
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21,
        validate: {
            // isOldEnough(value) {
            //     if (value < 21) {
            //         throw new Error("Too young!!");
            //     }
            // }
            isNumeric: true
        }
    },
    WittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        // set(value) {
        //     const compressed = zlib.deflateSync(value).toString('base64');
        //     this.setDataValue('description', compressed)
        // },
        // get() {
        //     const value = this.getDataValue('description');
        //     const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        //     return uncompressed.toString();
        // }
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.username} ${this.description}`;
        }
    }, 
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        // validate: {
            // isEmail: true,
            // isIn: {
            //     // args: ['me@soccer.org', 'me@soccer.com', 'me@soccer.net'],
            //     // msg: 'the provided email must be one of the following...'
            // }
        //     myEmailValidator(value) {
        //         if (value==null) {
        //             throw new Error('plz enter email!')
        //         }
        //     }
        // }
    }   
},
{
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    validate: {
        usernamePassMatch() {
            if (this.username === this.password) {
                throw new Error("password cannot be your username!");
            } else {
                console.log('soccer');
            }
        }
    },
});

function myFunction () {
    console.log("RUNNING SQL STATEMENT!");
}

// User.sync({ alter: true }).then(() => {
//     return User.bulkCreate([
//     {
//         username: "Tom",
//         age: 25,
//         password: "soccer"
//     }, {
//         username: "M",
//         age: 31,
//         password: "333"
//     }, {
//         username: "FreddieM"
//     }
// ], { validate: true });
// }).then((data) => {
//     data.forEach((element) => { 
//         console.log(element.toJSON())
//     });    
// })
// .catch((err)=>{
//     console.log("Error synced the table and model!")
// });

// console.log(sequelize.models.user);

User.sync({ alter: true }).then(()=> {
    // return User.findAll({ attributes: [['username', 'myname'], ['password', 'pwd']]});
    // return User.findAll({ attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'howOld']]});
    // return User.findAll({ attributes: { exclude: ['password']}});
    // return User.findAll({ attributes: ['username'], where: { age: 45 }});
    // return User.findAll({ where: { age: 25, username: 'soccer'} });
    // return User.findAll({ limit: 2 });
    // return User.findAll({ order: [['age', 'DESC']] });
    // return User.findAll({ order: [['age', 'ASC']] });
    // return User.findAll({attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']],
    //     group: 'username'});
    // return User.findAll({ where: {
    //     [Op.or]: { username: 'soccer', age: 45 }
    // }})
    // return User.findAll({ where: {
    //     age: {
    //         [Op.gt]: 25
    //     }
    // }})
    // return User.findAll({ where : {
    //     age: {
    //         [Op.or]: {
    //             [Op.lt]: 45,
    //             [Op.eq]: null
    //         }
    //     }
    // }})
    // return User.findAll({ where: 
    //     sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 6)
    // })
    // return User.update({ username: 'pizza' }, { where: { age: 25 }})
    // return User.update({ username: 'Yes!' }, { where: { age: {[Op.gt]: 1 }}});
    // return User.destroy({ truncate: true});
    // return User.max('age');
    // return User.sum('age');
    // return User.findAll({ raw: true });
    // return User.findAll({ 
    //     where: {age : 25},
    //     raw: true 
    // });
    // return User.findByPk(28);
    // return User.findOne({ where: {
    //     age: {
    //         [Op.or]: {
    //             [Op.lt]: 28,
    //             [Op.eq]: null
    //         }
    //     }
    // }});
    // return User.findOrCreate({ 
    //     where: { username: 'pizza' }
    // });
    // return User.findOrCreate({ 
    //     where: { username: 'Tomy' },
    //     defaults: { 
    //         age: 27
    //     }
    // });
    // return User.findAndCountAll({
    //     where: { username: "WittCo" },
    //     raw: true
    // })
    // return User.create({
    //     username: 'Wire',
    //     password: 'soccerpizza',
    //     description: 'this is description it could be very long'
    // });
    // return sequelize.query(`UPDATE user SET age = 100 WHERE username = 'WittCo'`, { type: Sequelize.QueryTypes.UPDATE });
    return User.create({ username: 'jack'});
}).then((data) => {
    // data.forEach((element) => {
    //      console.log(element.toJSON())
    // }) 
    // const { count, rows } = data;
    // console.log(count);  
    // console.log(rows);
    console.log(data);
})
.catch((err)=>{ 
    console.log(err)
});