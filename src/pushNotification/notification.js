import { Expo } from "expo-server-sdk";
let tickets = [];

const createMessages = (pushTokens) => {
  const expo = new Expo();
  let messages = [];
  for (let token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: token,
      sound: "default",
      title: "alo",
      // will need to change url in prod build use process.ENV
      data: {
        url: `exp://192.168.30.24:19000/--/messages/1/alo`,
      },
    });
  }

  return messages;
};

const sendNotifications = (messages) => {
  const expo = new Expo();
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();
};  const messages = createMessages([
    "ExponentPushToken[GpPbMUB66QJlFaHi0__qll]",
  ]);
  sendNotifications(messages);