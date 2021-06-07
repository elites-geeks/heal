const db = require('./src/server/models/user');

async function addEmp() {
    try {

        const ent = new db.Entity({
            role: 'user',
            phone_number: '123456',
            email: 'lololol@yahoo',
            password: "123",
            username: 'omar'
        });
        const savedEnt = await ent.save();
        // const user = new db.User({
        //     firstname: "omar",
        //     lastname: "ram",
        //     info: savedEnt,
        //     date_of_birth: '123',
        //     gender: 'male',
        //     country: 'dsadsa',
        //     img: 'dsadas',
        //     type: 'employee'
        // })
        // const savedUser = await user.save();
        // const emp = db.Employee({
        //     info: savedUser,
        //     field: 'admin',
        //     yearsOfExp: 5,
        //     institute: 'dasdas',
        // });
        // const savedEmp = await emp.save();
        console.log(savedEnt);
    } catch (err) {
        console.log(err);
    }
}
addEmp();
