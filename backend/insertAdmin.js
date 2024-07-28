var mongoose = require("mongoose");
var { AdminModel } = require("./model");


const mongoURI = "mongodb+srv://vishnu:vishnu@cluster0.hj3xm0s.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to db");

  
  const admin = new AdminModel({
    username: "admin",
    password: "admin123" 
  });

  
  admin.save()
    .then(() => {
      console.log("Admin user created");
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
      mongoose.connection.close();
    });
}).catch(err => {
  console.log(err);
});
