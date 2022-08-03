const TweetSchema=require('../Schemas/TweetSchema');


const Tweet=class{
    tweetId;
    title;
    text;
    creationDateTime;
    userId;

    constructor({title,text,creationDateTime,userId,tweetId}){
        this.title=title;
        this.text=text;
        this.creationDateTime=creationDateTime.toString();
        this.userId=userId;
        this.tweetId=tweetId;
    }
    static countTweetOfUser(userId){
        return new Promise((resolve,reject)=>{

            try{
                const count=TweetSchema.count({userId});
               return resolve(count);
            }
            catch(err){
               return reject(err);
            }
        })
    }
    createTweet() {
        return new Promise(async (resolve, reject) => {
            
            const tweet = new TweetSchema({
                title: this.title,
                text: this.text,
                creationDateTime: this.creationDateTime,
                userId: this.userId
            })
            console.log(this.creationDateTime);

            try {
                // console.log(tweet);
                const dbTweet = await tweet.save();
                

                return resolve(dbTweet);
            }
            catch(err) {
                return reject(err);
            }
        })
    }

    static findTweetId(tweetId){
        return new Promise(async (resolve,reject)=>{
            try{
                const dbTweet=await TweetSchema({_id:tweetId});
                return resolve(dbTweet);
            }
            catch(err){
                return reject(err);
            }
        })
    }
    updateTweet(){
        return new Promise(async (resolve,reject)=>{

            const newTweetData={};
            if(this.title){
                newTweetData.title=this.title
            }
            if(this.text){
                newTweetData.text=this.text;
            }
            try{
                const dbTweet=await TweetSchema.findOne({_id:this.tweetId},newTweetData);
                return resolve(dbTweet);
            }
            catch(err){
                return reject(err);
            }
        })
    }
    deleteTweet(){
        return new Promise(async (resolve,reject)=>{

            try{
                const dbTweet=await TweetSchema.findOneAndDelete({_id:this.tweetId});
                return resolve(dbTweet);
            }
            catch(err){
                return reject(err);
            }
        })
    }
}

module.exports=Tweet;