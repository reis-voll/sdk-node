const rest = require('../../utils/rest.js');
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    /**
     *
     * UtilityPayment Log object
     *
     * @description Every time a UtilityPayment entity is modified, a corresponding UtilityPayment Log
     * is generated for the entity. This log is never generated by the user, but it can
     * be retrieved to check additional information on the UtilityPayment.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param payment [UtilityPayment]: UtilityPayment entity to which the log refers to.
     * @param errors [list of strings]: list of errors linked to this UtilityPayment event.
     * @param type [string]: type of the UtilityPayment event which triggered the log creation. ex: 'processing' or 'success'
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor(created, type, errors, payment, id = null) {
        super(id);
        this.created = created;
        this.type = type;
        this.errors = errors;
        this.payment = payment;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'UtilityPaymentLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment Log
     *
     * @description Receive a single UtilityPayment Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns UtilityPayment Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit = null, after = null, before = null, types = null, paymentIds = null, user = null} = {}) {
    /**
     *
     * Retrieve UtilityPayment Logs
     *
     * @description Receive a generator of UtilityPayment Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
     * @param paymentIds [list of strings, default null]: list of UtilityPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of UtilityPayment Log objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        paymentIds: paymentIds,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor = null, limit = null, after = null, before = null, types = null, paymentIds = null, user = null } = {}) {
    /**
     *
     * Retrieve paged UtilityPayment Logs
     *
     * @description Receive a list of up to 100 UtilityPayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
     * @param paymentIds [list of strings, default null]: list of UtilityPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of UtilityPayment.Log objects with updated attributes and cursor to retrieve the next page of UtilityPayment.Log objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        paymentIds: paymentIds,
    };
    return rest.getPage(resource, query, user);
};
