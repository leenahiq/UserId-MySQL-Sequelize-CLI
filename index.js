require("dotenv").config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_Round);

const connection = require("./connection");
const User = require("./models/user");
//npm start -- --register --name "billy" --fullname "bill jones" --password "password"

// console.log(connection); check after connection.js and importing

//main function

//   console.log("hello world"); check main function work
(async (argv) => {
  // console.log(argv); to check yarg function
  await User.sync({ alter: true });
  if (argv.register && argv.username && argv.fullname && argv.password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(argv.password, salt);
    //creating instance
    const user = await User.create({
      username: argv.username,
      fullname: argv.fullname,
      password: hashedPass,
    });
  } //// npm start -- --lists
  else if (argv.list) {
    const users = await User.findAll();
    console.log(users);
  } //function need working
  else if (argv.findId) {
    const userId = User.findAll({
      where: {
        id: argv.id,
      },
    });
    console.log(userId);
  } //function need working
  else if (argv.update) {
    const user = await User.update(
      {
        username: argv.username,
        fullname: argv.fullname,

        password: argv.password,
      },

      {
        where: {
          id: argv.id,
        },
      }
    );
    console.log(user);
  } else if (argv.delete) {
    const user = await User.destroy({
      where: {
        username: "argv.username",
      },
    });
    console.log(` ${user.username} is deleted `);
  }
  // console.log(user.id);
  // npm start -- --getuser --username "lilly" --password "password"
  else if (argv.getuser && argv.username && argv.password) {
    const user = await User.findOne({ where: { username: argv.username } });
    if (!user) {
      console.log("Invalid user");
    }
    const matched = await bcrypt.compare(argv.password, user.password);
    if (matched) {
      console.log(`${user.fullname} has logged in`);
    } else {
      console.log("Password is incorrect");
    }
  }
})(argv);

// class MyObject {
//     constructor(name){
//         this.name = name
//     }
// }
// const leenah = new MyObject("leenah")

// ternary Oprator
// myObject ? myObject: false
