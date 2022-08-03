function verifyTextAndTitle({title,text}){
    return new Promise((resolve,reject)=>{

        if(!title || !text || typeof(title)!="string" || typeof(text)!="string"){
            return reject("Invalid request parameter Missing title or body text");
        }
        if(title.length>200){
            return reject("title is too long, max character is allowed 200")
        }
        
        if(text.length>1000){
            return reject("Body too long, max character is allowed 1000");
        }
        return resolve();
    });
}

module.exports={verifyTextAndTitle};