const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function createItem(id, data){
    const params = {
        TableName : process.env.TABLE_NAME,
        Item: {
           id: id,
           data
        }
    }

    try {
      return await docClient.put(params).promise();
    } catch (err) {
      return err;
    }
}

module.exports.handler = async (event) => {
    let file = event.Records[0].s3;
    console.log(file);
    await createItem(file.object.key, file.object)
    return {};
};