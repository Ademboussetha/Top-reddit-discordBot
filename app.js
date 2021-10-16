const express = require('express')
const app = express()
const Discord = require('discord.js')
const { get } = require('request')
const fetch = require("node-fetch")
const client = new Discord.Client()
var request = require('request'), modhash
var shortUrl = require('node-url-shortener');

require('dotenv').config();
client.login(process.env.API_KEY)
const SECTIONS = [
    "hot",
    "new",
    "top",
    "controversial"
]


async function reply(){
    const message =  new Discord.MessageEmbed().setColor("RANDOM").setDescription(`according to my calculations, you are funny😂`)
    return message.channel.send(message);

}
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
function validateCommand(command,args){
    if (isNaN(command)){
        if (!isNaN(args[0])){ //is a number
            if (!args[1]) return true
            return false
        }
        else if (!args[0]) return true
        else{
            if (!isNaN(args[1]) && SECTIONS.includes(args[0]))return true
            return false
        }
    }
}
var link;
async function shorterUrl(link){
    shortUrl.short(link, function (err, url) {
        console.log(url)
        link = url
    });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
});

client.on('message', async (message) => {
    /**
     * check prefix "!reddit" so we know a user is calling the bot
     * after that we gonna split the input into commands and args 
     * so we can make a request based on that informations (commands and args)
     * 
     */
    const prefix = "!reddit"
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    /**
     * handling no command error
     * In case the user doesnt choose the section we'll number of posts that he wants to see.
     * then we call CommandValidator function to make sure the function is correct 
     */
    if (!command) return message.channel.send("You have to select a Subreddit")
    var commandValidation = validateCommand(command,args)
    if (!commandValidation) return message.channel.send("Verify your command please :D")
    var API_DATA= (SECTIONS.includes(args[0])) && (!isNaN(args[1])) ? await getData(command, args[0], args[1]):
                    (!isNaN(args[0])) ? await getData(command, undefined, args[0]) :
                    await getData(command, undefined, 5)
    console.log(API_DATA.data.children)      
    console.log(shorterUrl("https://www.reddit.com/r/MachineLearning/comments/q86kqn/d_what_are_some_ideas_that_are_hyped_up_in/"))
    // handling NO SUBREDDIT error
    if (API_DATA.data.children.length===0) return message.channel.send(`Sorry, there aren’t any communities on Reddit with the name **${command}**.This community may have been banned or the community name is incorrect.`)
    // send embedded message 
    const reply =   await new Discord.MessageEmbed().setColor("BLUE").addField("Title : ", API_DATA.data.children[0].data.title,true).addField("Url : ",link,true)
    // setDescription(API_DATA.data.children[0].data.url)
    return message.channel.send(reply);
    

    // message.channel.send(API_DATA.data.children[0].data.selftext)
    // console.log(data.children[0])

});