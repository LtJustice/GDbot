const Discord = require('discord.js')
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");
let prefix = botconfig.prefix;
let token = botconfig.token;
const roles = require("./roles.json")

bot.on('ready', () => {
    console.log('Shooting for the Stars...');
    bot.user.setActivity('with the Moon');
})

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

/////////////////////////////////////////////////   Join + Leave Logs

bot.on('guildMemberAdd', member => {
    member.addRole(roles.unverified).catch(console.error);
    const embed = new Discord.RichEmbed()
        .setAuthor(`Member Joined`)
        .setTitle(`${member.user.tag}`)
        .setDescription(`<@${member.user.id}>`)
        .setThumbnail(`${member.user.avatarURL}`)
        .addField(`User Created`, `${member.user.createdAt}`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
    var channel = member.guild.channels.find(ch => ch.name === 'join-logs');
    channel.send(embed)
        .catch(err => {
            const embed = new Discord.RichEmbed()
                .setAuthor(`Member Joined`)
                .setTitle(`${member.user.tag}`)
                .setDescription(`<@${member.user.id}>`)
                .addField(`User Created`, `${member.user.createdAt}`)
                .setFooter(`ID: ${member.id}`)
                .setTimestamp()
            var channel = member.guild.channels.find(ch => ch.name === 'join-logs');
            channel.send(embed)
        });
});

bot.on('guildMemberRemove', member => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`Member Left`)
        .setTitle(`${member.user.tag}`)
        .setDescription(`<@${member.user.id}>`)
        .setThumbnail(`${member.user.avatarURL}`)
        .addField(`User Created`, `${member.user.createdAt}`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
    var channel = member.guild.channels.find(ch => ch.name === 'join-logs');
    channel.send(embed)
        .catch(err => {
            const embed = new Discord.RichEmbed()
                .setAuthor(`Member Left`)
                .setTitle(`${member.user.tag}`)
                .setDescription(`<@${member.user.id}>`)
                .addField(`User Created`, `${member.user.createdAt}`)
                .setFooter(`ID: ${member.id}`)
                .setTimestamp()
            var channel = member.guild.channels.find(ch => ch.name === 'join-logs');
            channel.send(embed)
        });
});

/////////////////////////////////////////////////   Commands

bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(' ');
    
    if (message.channel.id === `655182882347810833`, '654853970308628481', '652606846401511424')

    switch(args[0]) {

        case 'blastoff':
                bot.commands.get('blastoff').execute(message, args);
            break;

        case 'help':
            bot.commands.get('help').execute(message, args);
        break;

        case 'role':
            bot.commands.get('role').execute(message, args);
        break;

        case 'verify':
            bot.commands.get('verify').execute(message, args);
        break;

        case 'kick':
            bot.commands.get('kick').execute(message, args);
        break;

        case 'apply':
            bot.commands.get('apply').execute(message, args);
        break;

        case 'ticket':
            bot.commands.get('ticket').execute(message, args);
        break;
        
        case 'closeticket':
            bot.commands.get('closeticket').execute(message, args);
        break;

        case 'purge':
            bot.commands.get('purge').execute(message, args);
        break;

        case 'appeal':
            bot.commands.get('appeal').execute(message, args);
        break;

    }
});

//Logging

bot.on("messageDelete", async message => {

    if (message.author.bot) return;

    const deleteLog = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`\`${message.content}\``)
    .setFooter(message.author.id)
    .addField("Channel:", message.channel)
    .setTimestamp()
    message.guild.channels.find(ch => ch.name === `deleted-messages-log`).send(deleteLog);

})

bot.login(token);