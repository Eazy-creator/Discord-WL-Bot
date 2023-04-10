import * as Discord from 'discord.js';
import fs from "fs";
import { parse } from "csv-parse";
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMembers] });
let whitelist_members = [];
fs.createReadStream("./Tier2.csv")
  .pipe(parse({ from_line: 2 }))
  .on("data", function (row) {
    whitelist_members.push(row[0]);
  });
client.on('ready', async () => {
  //Discord Server ID
  const guild = await client.guilds.fetch("934180722007212063");

  const members = await guild.members.fetch();
  for (const member of members) {
    const user = member[1].user.username + "#" + member[1].user.discriminator;
    console.log(user);
    if (whitelist_members.includes(user)) {
      console.log("Whitelist: " + user);
      //Include Exact Role Name
      let role = guild.roles.cache.find(role => role.name === "WL-Tier2");

      const roleMember = await guild.members.fetch(member[1].user.id);
      roleMember.roles.add(role).catch(console.error);
    }
  }
});

client.on("newMember", async (member) => {
  //
});
//Discord API credentials
client.login("MTA2NDk0NDM4NDgyMDM4Nzg5MQ.GwL_up.DV0GyD5FvYTCP1AU4d_SzDpb8XFAAW9Wr0lMaU");
