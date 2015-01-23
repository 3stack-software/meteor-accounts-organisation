
var organisationReady = new ReactiveVar(false);

function Organisations_loadSubscription_onError(e) {
  Log.error('Failed to subscribe to organisation', e);
}

function Organisations_loadSubscription_onReady () {
  organisationReady.set(true);
}

_.extend(Organisations, {

  ready: function() {
    return organisationReady.get();
  },

  id: emboxValue(function() {
    var organisationId = Organisations.lookup.id(Meteor.userId());
    organisationReady.set(false);
    if (organisationId == null) {
      return;
    }
    Meteor.subscribe('organisation', organisationId, {
      onError: Organisations_loadSubscription_onError,
      onReady: Organisations_loadSubscription_onReady
    });
    return organisationId;
  }),

  current: function(options) {
    var organisationId = Organisations.id();
    if (organisationId == null) {
      return null;
    }
    return Organisations.collection.findOne({
      _id: organisationId
    }, options);
  },

  currentValue: function(attributeName) {
    var $options, _ref;
    $options = {
      fields: {}
    };
    $options.fields[attributeName] = 1;
    return (_ref = Organisations.current($options)) != null ? _ref[attributeName] : void 0;
  }
});
