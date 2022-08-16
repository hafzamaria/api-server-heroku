import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// let port = null;
// if(process.env.PORT){
//     port = process.env.PORT;
// }else{
//     port = 3000;
// }

let users =[];
/////generate random number from 1to 10000000000

function randomNumber(){
  return Math.floor(Math.random()*10000000000);
}

app.post("/user",(req,res)=>{

    console.log(req.body);

    let newUser={
      id:randomNumber(),
      fullName:req.body.fullName,
      userName: req.body.userName,
      passward:req.body.passward,
    }

    users.push(newUser);

    res.send("user is created");

})

app.get("/user/:userId",(req,res)=>{//get single user

  let userId =req.params.userId;
  let isFound=false;

   for (let i=0; i < users.length; i++) {
    if (users[i].id == userId){
        res.send(users[i]);
        isFound =true;
        break;
    }
   }
   if(!isFound){
    res.send("user not found");

   }
})

app.get('/users', (req, res) => { //get all users
  res.send(users)
})

app.put("/user/:userId",(req,res)=>{
    res.send("your user is modified");
   
    let userId =(" req.params.userId");
    let userIndex = -1;

    for (let i=0; i < users.length; i++) {
      if (users[i].id == userId){
           userIndex = i;
          break;
      }
     }
     if(userIndex === -1){
      res.send("user not found");
     }else{
     if(req.body.fullName) 
     {users[userIndex].fullName = req.body.fullName};

     if(req.body.userName) 
     {users[userIndex].userName  = req.body.userName};

     if(req.body.passward) 
     {users[userIndex].passward = req.body.passward
    };
          res.send(users[userIndex]);
    }
     }
)

app.delete("/user/:userId",(req,res)=>{

  let userId =(" req.params.userId");
    let userIndex = -1;

    for (let i=0; i < users.length; i++) {
      if (users[i].id == userId){
           userIndex = i;
          break;
      }
     }
     if(userIndex === -1){
      res.send("user not found");
     }else{
     users.splice(userIndex, 1);
     res.send("user is deleted");
     }
})
app.delete("/users",(req,res)=>{
  users=[];
  res.send("All users deleted");
})

app.get('/', (req, res) => {
    console.log("ek request server per i");
  res.send('Hello World!')
})
app.get('/profile', (req, res) => {
    console.log("ek request server per i");
  res.send('This is a profile!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})