const express=require('express');
const {checkAuth}=require('../middleware');
const TweetModel=require('../Models/TweetModel');
const {verifyTextAndTitle}=require('../Utils/TweetUtils');


const tweet=express.Router();

tweet.post('/create',checkAuth,async (req,res)=>{
    const {title,text}=req.body;
    const userId=req.session.user.userId.toString();
    const creationDateTime=new Date();


    verifyTextAndTitle({title,text}).then(async ()=>{
        let tweetCount;
        try{
            tweetCount=await TweetModel.countTweetOfUser(userId);
        }
        catch(err){
            return res.send({
                status:400,
                message:"database Error",
                error:err
            })
        }
        if(tweetCount>=1000){
            return res.send({
                status:401,
                message:"you created too much tweet"
            })
        }
        const tweet=new TweetModel({userId,title,text,creationDateTime});
        try{
            
            const dbTweet=await tweet.createTweet();
            

            return res.send({
                status:200,
                message:"Tweet Created Succesfully",
                data:{
                    tweetId:dbTweet._id,
                    title:dbTweet.title,
                    text:dbTweet.text,
                    creationDateTime:dbTweet.creationDateTime
                }
            })
        }
        catch(err){
            return res.send({
                status:401,
                message:"Database Error",
                error:err
            })
        }
    }).catch((err) => {
        return res.send({
            status: 400,
            message: "Invalid Data",
            error: err
        })
    })

})


tweet.post('/update',checkAuth,(req,res)=>{
    const {title,text,tweetId}=req.body;
    const userId=req.session.user.userId;
    verifyTextAndTitle({title,text}).then(async ()=>{


        // Authorized to update the tweet
        let dbTweet;
        try{
            dbTweet=await TweetModel.findTweetId(tweetId);
        }
        catch(err){
            return res.send({
                status:401,
                message:"Database Error"
            })
        }
        if(!dbTweet){
            return res.send({
                status:401,
                message:"No Tweet Found"
            })
        }
        if(userId!==dbTweet.userId){
            return res.send({
                status:400,
                message:"UnAuthrized request found, Tweet belong to another user"
            })
        }


        // Update within 30 min
        const currentDateTime=Date.now();
        const creationDateTime=(new Date(dbTweet.creationDateTime)).getTime();

        const diff=(currentDateTime-creationDateTime)/(1000*60);
        if(diff>30){
            return res.send({
                status:401,
                message:"You cannot update the Tweet beacouse it exceed the limit of 30 minute"
            });
        }
        // update the tweet in db

        try{
            const tweet=new TweetModel({tweetId,title,text});
            const dbTweet=await tweet.updateTweet();

            return res.send({
                status:200,
                message:"Update, Sucessfull",
                data:dbTweet
            })
        }
        catch(err){
            return res.send({
                status:401,
                message:"Database Error",
                error:err
            })
        }


    }).catch((err)=>{
        return res.send({
            status: 400,
            message: "Invalid Data",
            error: err
        })
    })
})

tweet.post('/delete',checkAuth,async (req,res)=>{
    const {tweetId}=req.body;

    if(!tweetId){
        return res.send({
            status:400,
            message:"Invalid Request"
        })
    }




    const userId=req.session.user.userId;
    let dbTweet;
    try{
        dbTweet=await TweetModel.findTweetById(tweetId);
    }
    catch(err){
        return res.send({
            status:401,
            message:"Database error",
            error:err
        })
    }
    if(!dbTweet){
        return res.send({
            status:401,
            message:"Invalis tweetId"
        })
    }

    if(userId!=dbTweet.userId){
        return res.send({
            status:401,
            message:"Unauthorized request",
            error:err
        })
    }

    // Deleting Tweet
    const tweet=new TweetModel({tweetId});
    try{
        const dbTweet=await tweet.deleteTweet();
        return res.send({
            status:200,
            message:"Tweet Deleted Sucessfully",
            data:dbTweet
        })
    }
    catch(err){
        return res.send({
            status:400,
            message:"Something went wrong"
        })
    }
})

tweet.get('/*',(req,res)=>{
    res.send("Page not Found");
})


module.exports=tweet;