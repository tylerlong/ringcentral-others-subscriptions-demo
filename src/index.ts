import RingCentral from '@rc-ex/core';
import PubNubExtension from '@rc-ex/pubnub';

const rc1 = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const rc2 = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

(async () => {
  await rc1.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  await rc2.authorize({
    username: process.env.RINGCENTRAL_USERNAME_2!,
    extension: process.env.RINGCENTRAL_EXTENSION_2,
    password: process.env.RINGCENTRAL_PASSWORD_2!,
  });
  // const pubnubExtension = new PubNubExtension();
  // await rc2.installExtension(pubnubExtension);
  // pubnubExtension.subscribe(['/restapi/v1.0/account/~/extension'], () => {});

  const subs1 = await rc1.restapi().subscription().list();
  const subs2 = await rc2.restapi().subscription().list();

  console.log(JSON.stringify(subs1, null, 2));
  console.log(JSON.stringify(subs2, null, 2));

  const sub1 = await rc1.restapi().subscription(subs2.records![0].id).get();
  console.log(JSON.stringify(sub1, null, 2));

  // const sub2 = await rc2.restapi().subscription(subs2.records![0].id).get();
  // console.log(JSON.stringify(sub2, null, 2));

  await rc1.revoke();
  await rc2.revoke();
})();
