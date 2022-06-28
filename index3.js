const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('sequelizepractice', 'root', '1234', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        freezeTableName: true   
    }
});

const Member = sequelize.define('member', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

Member.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(Member, { onDelete: 'CASCADE' });

let memeber, post;

// sequelize.sync({ alter: true }).then(()=> {
//     return Member.findOne({ where: { username: 'WittCode' }})
// }).then((data) => {
//     member = data;
//     return Post.findAll();
// }).then((data) => {
//     post = data;
//     return member.addPosts(post);
// }).then((data) => {
//     console.log(data);
// })
// .catch((err)=> {
//     console.log(err);
// })

sequelize.sync({ alter: true }).then(()=> {
    return Member.findOne();
}).then((data) => {
    member = data;
    return Post.findOne();
}).then((data) => {
    post = data;
    return post.setMember(member);
}).then((data) => {
    console.log(data);
})
.catch((err)=> {
    console.log(err);
})