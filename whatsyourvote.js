
// Each user equals a vote
Votes = Meteor.users;


if (Meteor.isClient) {

    // Get all the votes
    Template.content.votes = function() {
        return Votes.find({'profile.vote': {$exists: true}});
    };

    // Get all the yeses
    Template.content.yeses = function() {
        return Votes.find({'profile.vote': 'yes'});
    }

    // Get all the nos
    Template.content.nos = function() {
        return Votes.find({'profile.vote': 'no'});
    }

    // Calculate the percentage of yeses
    Template.content.percentageYeses = function() {
        return Votes.find({'profile.vote': 'yes'}).count() / Votes.find().count() * 100;
    }

    // Calculate the percentage of nos
    Template.content.percentageNos = function() {
        return Votes.find({'profile.vote': 'no'}).count() / Votes.find().count() * 100;
    }

    // Update votes
    Template.content.events = {
        'click #yes': function() {
            Votes.update(Meteor.user()._id, {'$set': { 'profile.vote': 'yes' }});
        },
        'click #no': function() {
            Votes.update(Meteor.user()._id, {'$set': { 'profile.vote': 'no' }});
        },
    };

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // Reset everything
        /*Meteor.users.find().forEach(function(user) {
            Meteor.users.remove(user._id);
        });*/
    });
}
