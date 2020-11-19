const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../../src/service/userService');

const A_USER = {
    discordUser: 'discordUsername',
    minecraftUser: 'minecraftUsername'
}

const DB_RESP_USER = {
    Item: A_USER
}

describe('userService: When getUserByDiscordId is called', function() {
    describe('And DB returns a user', function() {
        it('Returns the user', async function() {
            const fakeDocClient = {
                get: sinon.stub().returnsThis(),
                promise: sinon.stub().resolves(DB_RESP_USER)
            }
            const item = await userService.getUserByDiscordId(fakeDocClient, 'discordUsername')
            expect(item).to.be.deep.equal(A_USER)
        })
    })
    describe('And DB does not find a matching user', function() {
        it('Throws a \'user not found\' error', async function() {
            const fakeDocClient = {
                get: sinon.stub().returnsThis(),
                promise: sinon.stub().resolves({})
            }
            try {
                await userService.getUserByDiscordId(fakeDocClient, 'discordUsername')
                expect(true).to.be.false
            } catch (err) {
                expect(err.message).to.be.equal('user not found')
            }
        })
    })
    describe('And an error is thown while connecting to the DB', function() {
        it('Throws the error back up to the caller', async function() {
            const fakeDocClient = {
                get: sinon.stub().returnsThis(),
                promise: sinon.stub().rejects('errorName', 'some error')
            }
            try {
                await userService.getUserByDiscordId(fakeDocClient, 'discordUsername')
                expect(true).to.be.false
            } catch (err) {
                expect(err.message).to.be.equal('some error')
            }
        })
    })
})