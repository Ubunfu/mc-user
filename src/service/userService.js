async function getUserByDiscordId(docClient, discordId) {
    let params = {
        TableName: process.env.TABLE_USERS,
        Key: {
            discordUser: discordId
        }
    }
    const item = await docClient.get(params).promise();
    if (item.Item == undefined) {
        throw Error('user not found');
    }
    return item.Item;
}

exports.getUserByDiscordId = getUserByDiscordId;