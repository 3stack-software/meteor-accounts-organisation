Organisations = {
  collection: new Mongo.Collection("organisations"),
  lookup: {
    "id": function(userId) {
      var userSettings;
      if (userId == null) {
        return null;
      }
      userSettings = Meteor.users.findOne({
        _id: userId,
        organisationId: {
          $exists: true
        }
      }, {
        fields: {
          organisationId: 1
        }
      });
      return userSettings != null ? userSettings.organisationId : void 0;
    },
    "record": function(userId, options) {
      var organisationId;
      organisationId = Organisations.lookup.id(userId);
      if (organisationId == null) {
        return null;
      }
      return Organisations.collection.findOne(organisationId, options);
    }
  }
};

