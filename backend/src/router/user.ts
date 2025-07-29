import express, { Request, Response } from 'express';
import {AccountModel, UserModel} from './../db'
import zod, { string } from 'zod'
import jwt from 'jsonwebtoken'
import JWT_SECRET from '../config';
import { authMiddleware } from '../middleware';


const router = express.Router();

router.use(express.json());

const sigupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string()
})

router.post('/signup' ,async (req,res) =>{
    
    const {username , password} = req.body;

    const {success} = sigupSchema.safeParse(req.body);

    if(!success){
        res.status(400).json({message : "email take/ incorrect"})
        return;
    }

    try{
        const user = await UserModel.findOne({
            username : req.body.username
        })
        if(user){
            res.status(401).json({message : "user already exist"});
            return;
        }

        // create new user 

        const newUser = await UserModel.create({
            username : req.body.username,
            password : req.body.password,
            firstname : req.body.firstname,
            lastname : req.body.lastname
        })
    
        const userId = newUser._id;
    
        await AccountModel.create({
            userId,
            balance : 1 + Math.random () * 1000
        })


        const token = jwt.sign({
            userId: newUser._id
        }, JWT_SECRET);

        res.json({ 
            message : "user signed up",
            token : token
        })

    }catch (e) {

        res.status(500).json({message : "something wrong"})

    }
})

router.post('/signin' ,async (req,res) =>{

    const {username , password} = req.body;

    try{
        const user = await UserModel.findOne({
            username : req.body.username
        })
        if(!user){
            res.status(411).json({message : "user not found"});
            return; 
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({ 
            message : "user signed in",
            token : token
        })

    }catch (e) {

        res.status(500).json({message : "something wrong"})

    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.put('/', authMiddleware , async (req: Request, res: Response) => {

    const {success} = updateBody.safeParse(req.body)

    if(!success){
        res.status(400).json({message : "Error while updating information"})
        return;
    }

    await UserModel.updateOne({
        _id: req.userId
    }, req.body);

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    try {
      const filter = req.query.filter?.toString() || ""; 
      const regexFilter = { $regex: filter, $options: "i" } 
  
      const users = await UserModel.find({
        $or: [
          { firstname: regexFilter },
          { lastname: regexFilter }
        ]
      })
  
      res.json({
        user: users.map((user) => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id,
        })),
      })
    } catch (error) {
      console.error("Error fetching users:", error)
      res.status(500).json({ message: "Error fetching users" })
    }
  })

  router.get('/me', authMiddleware, async (req, res) => {

    const user = await UserModel.findById(req.userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ firstname: user.firstname, lastname: user.lastname })
  })
  

export default router; 
