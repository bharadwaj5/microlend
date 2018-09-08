# Microlend

    This is a microlending application built on hyperledger fabric using hyperledger composer tool.

# Commands to run the application
# Creating peeradmin card

    Migrate to fabric-tools folder and executing following command create PeerAdminCard

    ./createPeerAdminCard.sh
# Installing runtime
    Executing following command installs the run time

    composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName microlend
# Starting business network
    Now migrate to microlend folder and execute following command to start the microlend network.

    composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile microlend@0.0.1.bna --file networkadmin.card
# Pinging the network
    Below is the command to ping the deployed network. It is to check whether the network in running perfectly or not.

    composer network ping --card admin@microlend
