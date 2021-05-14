const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
   
    client.user.setPresence({
      activity: {
        name: `BlueJay Shower ;) | 5 second cool down`,
        type: "WATCHING"
      },
      status: 'idle'
    })
      .catch(console.error);
    client.user.setUsername('snipe bot')
      .then(user => console.log(`My new username is ${user.username}`))
      .catch(console.error);

  }
}