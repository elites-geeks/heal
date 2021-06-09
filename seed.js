const mongoose = require('mongoose');
const db = require('./src/server/models/user');
require('dotenv').config();
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  async function addEmp() {
    try {
      const ent = new db.Entity({
        role: 'user',
        phone_number: '123456',
        email: 'lololol@yahoo',
        password: '123',
        username: 'omar5',
      });
      const savedEnt = await ent.save();
      const user = new db.User({
        firstname: 'omar',
        lastname: 'ram',
        info: ent,
        date_of_birth: '123',
        gender: 'male',
        country: 'dsadsa',
        img: 'dsadas',
        type: 'employee',
      });
      const savedUser = user.save();

      const emp = new db.Employee({
        info: user,
        field: 'admin',
        yearsOfExp: 5,
        institute: 'dasdas',
      });
      const savedEmp = await emp.save();
      console.log(savedEmp);
      console.log(savedEmp.info.info.token);
    } catch (err) {
      console.log(err);
    }
  }
  console.log('Hi');
  addEmp();
});
