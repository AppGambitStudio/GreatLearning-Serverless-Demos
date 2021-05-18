const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function createItem(id, data){

    const params = {
        TableName : process.env.TABLE_NAME,
        Item: {
           id: id,
           status: true,
           message: 'New Item Added',
           type: 'async',
           data
        }
    }

    try {
      await docClient.put(params).promise();
    } catch (err) {
      return err;
    }
}

module.exports.handler = async (event) => {
    console.log(event);        

    await createItem(Date.now() + "", event.body);
    return {};

    // return new Promise((res, rej) => {
    //     setTimeout(( ) => {
    //         console.log('returning response');
    //         const response = {
    //             status: true,
    //             message: 'Function execution successfully done.'
    //         };
    //         res(response);
    //     }, 5000);        
    // });    
};