const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const Duration = require('human-duration')
const used = new Map();

module.exports = class SnipeCommand extends BaseCommand {
  constructor() {
    super('snipe', 'fun', []);
  }

  async run(client, message, args) {
    const msg = client.snipes.get(message.channel.id);
    const cooldown = used.get(message.author.id);

    if (cooldown) {
      const remaining = Duration(cooldown - Date.now(), { units: ['h', 'm'], round: true});
      return message.reply(`you need to wait ${remaining} before using this command again!`).catch(err => console.log(err));
    }
    else {
       
      used.set(message.author.id, Date.now() + 5000);
      setTimeout(() => { used.delete(message.author.id)}, 5000);
    }
    if (!msg) return message.channel.send('There is no message to snipe');

    const snipeEmbed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setFooter(message.author.tag)
    .setTimestamp();

    message.channel.send(snipeEmbed);
  }
}