accounts-organisation
===========================

Adds a collection `Organisations.collection = new Mongo.Collection('organisations')`, which can be used to group users together.

Getting Started
-----------------------------

You must provide a publication called 'organisation' which returns the organisation for the current user.

Additionally, you'll need to ensure that you're publishing the `organisationId` property of the current user.

I recommend:

```coffeescript
if (Meteor.isClient)
  # subscribe to organisationId property
  Meteor.subscribe('user')

  if (Meteor.isServer)
  # publish custom fields to Meteor.users
  Meteor.publish "user", ->
    unless @userId?
      @ready()
      return null

    return Meteor.users.find
      _id: @userId
    ,
      fields:
        organisationId: 1
        profile: 1

  Meteor.publish 'organisation', (organisationId) ->
    unless @userId?
      @stop()
      return null
    user = Meteor.users.findOne({_id: @userId}, {
      fields: {
        organisationId: true
      }
    })

    organisationCursor = Organisations.collection.find({
      _id: user.organisationId
    })

    # allow user to see others in their org
    organisationUsersCursor = Meteor.users.find({
      organisationId: user.organisationId
    }, {
      fields: {
        _id: 1
        emails: 1
        "profile.name": 1
        organisationId: 1
      }
    })

    return [organisationCursor, organisationUsersCursor]


```

API
===========================

Client:
-----------------

`Organisations.id()`
Returns the current users organisationId, just like `Meteor.userId()`

`Organisations.ready()`
Reactive function, will be valid when `organisation` subscription data is ready

`Organisations.current(options)`
Akin to `Meteor.user()` - reactively returns the user

`Organisations.currentValue(attributeName)`
Helper method, return the value of an attribute of the current users organisation. eg. `Organisations.currentValue('name')`

Client & Server:
-----------------------

`Organisations.collection`
Direct access to the mongo collection

`Organisations.lookup.id(userId)`
Returns the organisation id for the provided user

`Organisations.lookup.record(userId, options)`
Returns the organisation for the provided user.

