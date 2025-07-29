import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware';
import { AccountModel } from '../db';
import mongoose from 'mongoose';

const router = express.Router();

router.use(express.json());

router.get("/balance" , authMiddleware,async (req, res) =>{

    const account = await AccountModel.findOne({
        userId : req.userId
    })

    if (!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }

    res.json({
        balance : account.balance
    })

})

// router.post("/transfer" , authMiddleware, async(req , res) => {

//     const {amount , to } = req.body;

//     const toAccount = await AccountModel.findOne({
//         userId : to
//     })

//     if(!toAccount){
//         res.status(401).json({
//             messege : "invalid account"
//         })
//     }

//     await AccountModel.updateOne({
//         userId : req.userId
//     } , {
//         $inc : {
//             balance : -amount
//         }
//     })

//     await AccountModel.updateOne({
//         userId : to
//     } , {
//         $inc : {
//             balance : amount
//         }
//     })

//     res.json({
//         messege : "transfer successfull"
//     })

// })

router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await AccountModel.findOne({ userId: req.userId }).session(session);

    if (!account || typeof account.balance !== 'number' || account.balance < amount || amount < 0) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        });
        return;
    }

    const toAccount = await AccountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
         res.status(400).json({
            message: "Invalid account"
        });
    }

    await AccountModel.updateOne({ 
        userId: req.userId
     }, { 
        $inc: { balance: -amount } 
    }).session(session);

    await AccountModel.updateOne({ 
        userId: to 
    }, { 
        $inc: { balance: amount } 
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
 
export default router; 