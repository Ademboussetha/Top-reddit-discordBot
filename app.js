const express = require('express')
const app = express()
const Discord = require('discord.js')
const { get } = require('request')
const fetch = require("node-fetch")
const client = new Discord.Client()
var request = require('request'), modhash
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


// Making request to reddit API and returning the data as JSON 
async function getData(subreddit, section, limit) {
    //Checking if section is selected or not
    var api_url = `https://www.reddit.com/r/${subreddit}/${section}.json?limit=${limit}`
    api_url = (typeof section !== 'undefined') ? api_url : `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`
    //Showing on Log the URL we are getting data from
    console.log(`GET REQUEST TO ${api_url}`)
    //try catch so we handle the error from the async function.
    try {
        const fetch_res = await fetch(api_url)
        const API_DATA = await fetch_res.json();
        return API_DATA
    } catch (err) {
        console.log("request to reddit didnt work")
    }


}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
});

client.on('message', async (message) => {
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
    // handling no command error
    if (!command) return message.channel.send("You have to select a Subreddit")
    // In case the user doesnt choose the section we'll number of posts that he wants to see.
    // console.log(typeof args[0])
    // console.log(args[0])
    console.log(Number(args[0]))
    console.log(Number(args[1]))
    console.log(args)

    var API_DATA = (Number(args[0]) !== "NaN") ? await getData(command, undefined, args[0]) : ((Number(args[1]) == "NaN") ? await getData(command, undefined, 5) : await getData(command, args[0], args[1]));
    // console.log(API_DATA)
    // if (!isNaN(args[0])) {
    //     const API_DATA = await getData(command, undefined,args[0])
    //     console.log(API_DATA)
    //     console.log("adams")
    // }
    // else if (isNaN(args[1])){
    //     const API_DATA = await getData(command, undefined,5)
    //     console.log(API_DATA)
    // }
    // else {
    //     const API_DATA = await getData(command, args[0], args[1])
    //     console.log(API_DATA.data)
    // }

    // message.channel.send(API_DATA.data.children[0].data.selftext)

    // console.log(command)
    // console.log(args[0])
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