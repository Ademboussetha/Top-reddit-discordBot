const express = require ('express')
const app = express()
const Discord= require('discord.js')
const { get } = require('request')
const client = new Discord.Client()
var request = require ('request'),modhash
require('dotenv').config();
client.login(process.env.API_KEY)

function getposts (subrredit){
    var options = {
        url: "https://www.reddit.com/r/"+subreddit+"/hot.json",
        method  : 'GET'
    }
    console.log(options)
    return request(options,(err,res,body)=>{
        try{
            parsedBody= JSON.parse(body)
            // console.log(parsedBody.data)
        }catch(err){
            console.log(err)
        }
    })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
    });

client.on('message',(msg)=>{
    if (msg.content==="!getdata"){
        // msg.reply("hey you")
        var data =  getposts()
        // console.log(data)
    }
});
// client.on('message', msg => {
//     if (msg.content === 'getdata' )  {
//         // msg.reply('pong');
//         // getposts()
//         var options = {
//             url: "https://www.reddit.com/r/computervision/hot/.json",
//             method  : 'GET'
//         }
//         request(options,(err,res,body)=>{
//             if (err) return console.log(err)
//             // console.log(res.body[0].data)
//             response.send(body)
//             // client.channels.cache.get('781991471993454655').send(body)
//         })

//     }
//     });
app.get('/',(request,response)=>{
    response.send("adams")
    getposts()
})

app.listen(8000,()=>{
    console.log("live on 8000")
})