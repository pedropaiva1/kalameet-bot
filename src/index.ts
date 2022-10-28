import WhatsappBot, { WhatsappBotOptions } from "@totigm/whatsapp-bot";

const options: WhatsappBotOptions = {
  bot: {
    symbol: '/'
  }
}

const bot = new WhatsappBot(options);

bot.addCommand("hello", () => "world!");
bot.addCommand(
  "hey",
  async (message, client) => {
      const chatId = message.from;
      const contact = await client.getContactById(chatId);

      return `Hey ${contact.pushname}! How are you doing?`;
  },
  {
      description: "Say hey",
      explanation: "The bot will say hey to the user using their WhatsApp's name",
      example: {
          output: "Hey Toti! How are you doing?",
      },
  },
);
bot.addCommand(
  "sticker",
  async (message) => {
      if (message.hasMedia) {
          const media = await message.downloadMedia();
          if (media.data)
              message.reply(media, message.from, {
                  sendMediaAsSticker: true,
              });
      } else message.reply("Send an image or video to convert it to a sticker");
  },
  {
      description: "Convert an image or video to a sticker",
      explanation: "Send an image or video with the text !sticker and you will get it as an sticker",
      example: {
          input: "image/video",
          output: "sticker",
      },
  },
);