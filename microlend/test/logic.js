/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var AdminConnection = require('composer-admin').AdminConnection;
var BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
var IdCard = require('composer-common').IdCard;
var MemoryCardStore = require('composer-common').MemoryCardStore;
var path = require('path');

require('chai').should();
var namespace = 'test';
var assetType = 'bAccount';

describe('microlend' + namespace, ()=> {
    // In-memory card store for testing so cards are not persisted to the file system
    var cardStore = new MemoryCardStore();
    let adminConnection;
    let businessNetworkConnection;

    before(() => {
        // Embedded connection used for local testing
        var connectionProfile = {
            name: 'embedded',
            type: 'embedded'
        };
        // Embedded connection does not need real credentials
        var credentials = {
            certificate: 'FAKE CERTIFICATE',
            privateKey: 'FAKE PRIVATE KEY'
        };

        // PeerAdmin identity used with the admin connection to deploy business networks
        var deployerMetadata = {
            version: 1,
            userName: 'PeerAdmin',
            roles: [ 'PeerAdmin', 'ChannelAdmin' ]
        };
        var deployerCard = new IdCard(deployerMetadata, connectionProfile);
        deployerCard.setCredentials(credentials);

        var deployerCardName = 'PeerAdmin';
        adminConnection = new AdminConnection({ cardStore: cardStore });

        return adminConnection.importCard(deployerCardName, deployerCard).then(() => {
            return adminConnection.connect(deployerCardName);
        });
    });

    beforeEach(() => {
        businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });

        var adminUserName = 'admin';
        let adminCardName;
        let businessNetworkDefinition;

        return BusinessNetworkDefinition.fromDirectory(path.resolve(__dirname, '..')).then(definition => {
            businessNetworkDefinition = definition;
            // Install the Composer runtime for the new business network
            return adminConnection.install(businessNetworkDefinition.getName());
        }).then(() => {
            // Start the business network and configure an network admin identity
            var startOptions = {
                networkAdmins: [
                    {
                        userName: adminUserName,
                        enrollmentSecret: 'adminpw'
                    }
                ]
            };
            return adminConnection.start(businessNetworkDefinition, startOptions);
        }).then(adminCards => {
            // Import the network admin identity for us to use
            adminCardName = `${adminUserName}@${businessNetworkDefinition.getName()}`;
            return adminConnection.importCard(adminCardName, adminCards.get(adminUserName));
        }).then(() => {
            // Connect to the business network using the network admin identity
            return businessNetworkConnection.connect(adminCardName);
        });
    });

    describe('ChangeAssetValue()', () => {
        it('should change the value property of ' + assetType + ' to newValue', () => {
            var factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // Create a user participant
            var b1 = factory.newResource('test','borrower','b1');
            b1.firstName = 'abc';
            b1.lastName = 'def';
            b1.Phno = 7894562130;
            b1.mailid = 'abc@gmail.com';
            var add = factory.newConcept(namespace, 'Address');
            add.Dno = '8-96';
            add.Street = 'qwe';
            add.city = 'poi';
            add.pin = 584962;

            // Create the asset
            var a1 = factory.newResource('test','bAccount','a1');
            a1.iD = factory.newRelationship('test', 'borrower', b1.$identifier);
            a1.amt = 2000;
            a1.lamnt = 0;
            a1.rate = 0;
            a1.duedate = 0;
            a1.n = 0;
            a1.type = ' ';
            a1.desc = '...';
            a1.cnt = 0;

            // Create a transaction to change the asset's value property
            var changeAssetValue = factory.newTransaction('test', 'Proposal');
            changeAssetValue.Id = factory.newRelationship(namespace, assetType, a1.$identifier);
            changeAssetValue.description = 'test';
            changeAssetValue.amnt = 1000;
            changeAssetValue.dur = 1;
            changeAssetValue.type = 'si';

            return businessNetworkConnection.getParticipantRegistry(namespace + '.borrower').then(registry => {
                // Add the asset to the appropriate asset registry
                return registry.add(b1);
            }).then(() => {
                return businessNetworkConnection.getAssetRegistry(namespace + '.' + assetType);
            }).then(aReg => {
                return aReg.add(a1);
            }).then(() => {
                return businessNetworkConnection.submitTransaction(changeAssetValue);
            }).then(() => {
                return businessNetworkConnection.getAssetRegistry(namespace + '.bAccount');
            }).then((Asset) => {
                return Asset.get(changeAssetValue.type);
            }).then(newAsset => {
                newAsset.type.should.equal('si');
            });
        });
    });
});

