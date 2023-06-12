const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');
const Resource = require('../../utils/resource.js').Resource;

class Log extends Resource {
    /**
    * 
    * corporatecard.Log object
    *
    * @description Every time a CorporateCard entity is updated, a corresponding corporatecard.Log
    * is generated for the entity. This log is never generated by the user,
    * but it can be retrieved to check additional information on the CorporateCard.
    * 
    * Attributes (return-only):
    * @param id [string]: Unique id returned when the log is created. ex: "5656565656565656"
    * @param card [CorporateCard]: CorporateCard entity to which the log refers to.
    * @param type [string]: Type of the CorporateCard event which triggered the log creation. ex: "blocked", "canceled", "created", "expired", "unblocked", "updated"
    * @param created [string] creation datetime for the balance. ex: '2020-03-10 10:30:00.000'
    */

    constructor({ id, card, type, created }){
        super(id);
        this.card = card;
        this.type = type;
        this.created = check.datetime(created);
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'corporateCardLog'};

exports.get = async function (id, {user} = {}) {
    /**
    * 
    * Retrieve a specific corporatecard.Log
    * 
    * @description Receive a single corporatecard.Log object previously created by the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: Object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * @return corporatecard.Log object with updated attributes
    * 
    */

    return rest.getId(resource, id, user);
}

exports.query = async function ({limit, cardIds, types, after, before, ids, user} = {}) {
    /**
    * 
    * Retrieve corporatecard.Log
    * 
    * @description Receive a generator of corporatecard.Log objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param limit [integer, default null]: Maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param types [list of strings, default null]: Filter for log event types. ex: ["blocked", "canceled", "created", "expired", "unblocked", "updated"]
    * @param cardIds [list of strings, default null]: List of CorporateCard ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
    * @param ids [list of strings, default null]: List of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * @return Generator of corporatecard.Log objects with updated attributes
    * 
    */

    let query = {
        ids: ids,
        limit: limit,
        after: after,
        before: before,
        types: types,
        cardIds: cardIds,
    }

    return rest.getList(resource, query, user);
}

exports.page = async function ({cursor, limit, after, before, types, cardIds, ids, user} = {}) {
    /**
    * 
    * Retrieve paged corporatecard.Log
    * 
    * @descrition Receive a list of up to 100 corporatecard.Log objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @param cursor [string, default null]: Cursor returned on the previous page function call.
    * @param limit [integer, default 100]: Maximum number of objects to be retrieved. It must be an integer between 1 and 100. ex: 50
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param types [list of strings, default null]: Filter for log event types. ex: ["blocked", "canceled", "created", "expired", "unblocked", "updated"]
    * @param cardIds [list of strings, default null]: List of CorporateCard ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
    * @param ids [list of strings, default null]: List of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * @return List of corporatecard.Log objects with updated attributes
    * @return Cursor to retrieve the next page of corporatecard.Log objects
    * 
    */

    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        cardIds: cardIds,
        ids: ids,
    }

    return rest.getPage(resource, query, user);
}
