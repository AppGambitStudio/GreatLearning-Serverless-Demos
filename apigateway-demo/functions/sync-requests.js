const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function createItem(id, data){

    const params = {
        TableName : process.env.TABLE_NAME,
        Item: {
           id: id,
           status: true,
           message: 'New Item Added',
           type: 'sync',
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
    const body = JSON.parse(event.body)

    const rec = await createItem(Date.now() + "", body);    

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            status: true,
            message: 'Function execution successfully done.',
            rec
        }),
    };

    return response;
};