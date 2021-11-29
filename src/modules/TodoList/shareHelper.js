import {Lambda} from 'aws-sdk';

import {accessKeyId, secretAccessKey} from '../../constants';

export const sendMMS = async ({text, phoneNumber, img}) => {
  try {
    const lambda = new Lambda({
      accessKeyId,
      secretAccessKey,
      region: 'us-west-2',
    });

    const payload = {
      number: phoneNumber,
      text,
      img_url:
        img ||
        'https://cdn.discordapp.com/attachments/867947824841646121/904529283354087494/2Q.png',
    };
    return await lambda
      .invoke({
        FunctionName:
          'arn:aws:lambda:us-west-2:526811211502:function:jacobluidemo1232f667-staging',
        Payload: JSON.stringify(payload),
      })
      .promise();
  } catch (error) {
    console.error('Error on sending mms: ', error);
    throw new Error(error);
  }
};
