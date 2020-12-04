const express = require ('express')
const app = express()
const Discord= require('discord.js')
const { get } = require('request')
const fetch = require("node-fetch")
const client = new Discord.Client()
var request = require ('request'),modhash
require('dotenv').config();
client.login(process.env.API_KEY)

// function getposts (command){
//     var options = {
//         url: "https://www.reddit.com/r/"+command+"/hot.json",
//         method  : 'GET'
//     }
//     return request(options,(err,res,body)=>{
//         try{
//             parsedBody= JSON.parse(res)
//             // console.log(parsedBody.data)
//         }catch(err){
//             console.log(err)
//         }
//     })
// }

async function getData(subreddit,section){
    // Making request to reddit API and returning the data as JSON 
    const api_url = `https://www.reddit.com/r/${subreddit}/${section}.json`
    const fetch_res= await fetch(api_url)
    const API_DATA = await fetch_res.json();
    return API_DATA
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
    });

client.on('message',async (message)=>{
    /**
     * chech prefix "!reddit" so we know a user is calling the bot
     * after that we gonna split the input into commands and args 
     * so we can make a request based on that informations (commands and args)
     * 
     */
        const prefix = "!reddit"
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        const API_DATA = await getData(command,args);
        // message.channel.send(API_DATA.data.children[0].data.selftext)
        // console.log(command)
        console.log(args)
        // var data =  getposts(command)
        // console.log(data.children[0])
    
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