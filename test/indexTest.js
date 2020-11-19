const index = require('../src/index');
const userService = require('../src/service/userService');
const sinon = require('sinon');
const { expect } = require('chai');

const EVENT_GET_USER = {
    requestContext: {
        routeKey: 'GET /user'
    },
    queryStringParameters: {
        discordUser: 'discordUsername'
    }
}

const EVENT_UNKNOWN_REQ = {
    requestContext: {
        routeKey: 'GET /unknown/api'
    }
}

const RESP_ERROR_USER_NOT_FOUND = {
    error: 'get user failed',
    errorDetail: 'user not found'
}
const RESP_ERROR_OTHER = {
    error: 'get user failed',
    errorDetail: 'anything else'
}

const A_USER = {
    discordUser: 'discordUsername',
    minecraftUser: 'minecraftUsername'
}

describe('index: When unknown request is received', function() {
    it('Should return HTTP 404', async function() {
        const indexResp = await index.handler(EVENT_UNKNOWN_REQ);
        expect(indexResp.statusCode).to.be.equal('404');
    });
});

describe('index: When GET user API is called', function() {
    describe('And DB returns user data', function() {
        it('Returns HTTP 200', async function() {
            const userServiceMock = sinon.stub(userService, "getUserByDiscordId").returns(A_USER)
            const indexResp = await index.handler(EVENT_GET_USER)
            expect(indexResp.statusCode).to.be.equal('200')
            expect(JSON.parse(indexResp.body)).to.be.deep.equal(A_USER)
            userServiceMock.restore()
        })
    })
    describe('And DB does not find a matching user', function() {
        it('Returns HTTP 404', async function() {
            const userServiceMock = sinon.stub(userService, "getUserByDiscordId")
                .throws('errorName', 'user not found')
            const indexResp = await index.handler(EVENT_GET_USER)
            expect(indexResp.statusCode).to.be.equal('404')
            expect(JSON.parse(indexResp.body)).to.be.deep.equal(RESP_ERROR_USER_NOT_FOUND)
            userServiceMock.restore()
        })
    })
    describe('And error occurs checking the DB', function() {
        it('Returns HTTP 500', async function() {
            const userServiceMock = sinon.stub(userService, "getUserByDiscordId")
                .throws('errorName', 'anything else')
            const indexResp = await index.handler(EVENT_GET_USER)
            expect(indexResp.statusCode).to.be.equal('500')
            expect(JSON.parse(indexResp.body)).to.be.deep.equal(RESP_ERROR_OTHER)
            userServiceMock.restore()
        })
    })
})