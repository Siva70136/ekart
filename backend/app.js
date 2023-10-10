const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors=require("cors");
const userModel = require("./Model/usermodel");
const productModel = require('./Model/productModel');
const PORT = process.env.PORT || 8000
require("dotenv").config();

mongoose.set('strictQuery', false);


const app = express();
app.use(express.json())

app.use(
    cors({
      origin: 'https://ekart-theta.vercel.app',
    })
  );


mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is Connected..")
  }).catch(err => {
    console.log(err.message);
  })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected!');
});
//==================> User <=======================
app.post('/api/client/register', async (req, res) => {
  try {
    let Body = req.body;
    const { email, password } = Body;



    //==================> Email validation <=======================
    if (!Body.email) {
      return res.status(400).json("Please enter email");
    }
    const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Email = Emailregx.test(Body.email);
    if (!Email) {
      return res.status(400).json("Please enter valid email.");
    }

    //<===================
    const dublicateEmail = await userModel.findOne({ email: email });
    if (dublicateEmail) {
      return res.status(400).json(" Email Already Exists");
    }



    //==================> password validation <=======================
    if (!Body.password) {
      return res.status(400).json("Please enter password");
    }
    const Passregx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/;
    let Password = Passregx.test(Body.password);
    if (!Password) {
      return res
        .status(400)
        .json(
          "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
        );
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let savedData = await userModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);
//==================> GET Users <=======================
app.get('/api/client/get', async (req, res) => {
  try {
    let data = req.body
    let {email,password} = data
    let getUsers = await userModel.find();
    return res.status(200).json(getUsers)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);
//==================> Login user <=======================

app.post('/api/client/login', async (req, res) => {
  try {
    let Body = req.body;
    const { email, password } = Body;

    if (!email) {
      return res.status(400).json("Please enter email address");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let getUser = await userModel.findOne({ email });
    if (!getUser) return res.status(401).json("Email or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword) return res.status(401).json("Email or Password is incorrect.");

    //token

    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json(token);

  } catch (error) {
    return res.status(500).json(error.message);
  }
});






//==================> Products <=======================



//==================> Register <=======================

app.post('/api/product/register',async(req,res)=>{
  let Body =req.body;
  try{
    let savedData = await productModel.create(Body);
    res.status(201).send({ data: savedData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
})
//==================> Get Products <=======================

app.get('/api/products/get', async (req, res) => {
  try {
    let data = req.body
   
    let getProducts = await productModel.find();
    return res.status(200).json(getProducts)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);


//==================> Get By Id   <=========================
app.get('/api/product/:id', async (req, res) => {
  try {
   // let data = req.body
    const id=req.params.id;
    //console.log(id)
   
    let getProducts = await productModel.findById(id);
    return res.status(200).json(getProducts)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
);
//==================> Update Product <=======================
app.put('/api/product/update', async (req, res) => {
    try {
      let body = req.body
  
      const updatedProduct = await productModel.updateOne({ id: req.params.id }, { $set: body })
      return res.status(200).json(updatedProduct)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });

//==================> Delete Product <=======================
app.delete('/api/product/delete', async (req, res) => {
    try {
      let body = req.body
    
  
      const deletedProduct = await productModel.deleteOne({ _id: mongoose.Types.ObjectId(body )})
      return res.status(200).json(deletedProduct)
  
    } catch (error) {
      return res.status(500).json(error.message);
    }
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
