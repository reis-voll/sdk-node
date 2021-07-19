const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    /**
     *
     * Invoice Log object
     *
     * @description Every time an Invoice entity is updated, a corresponding Invoice Log
     * is generated for the entity. This log is never generated by the
     * user, but it can be retrieved to check additional information
     * on the Invoice.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param invoice [Invoice]: Invoice entity to which the log refers to.
     * @param errors [list of strings]: list of errors linked to this Invoice event
     * @param type [string]: type of the Invoice event which triggered the log creation. ex: 'registered' or 'paid'
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ created, type, errors, invoice, id }) {
        super(id);
        this.created = check.date(created);
        this.type = type;
        this.errors = errors;
        this.invoice = invoice;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'InvoiceLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice Log
     *
     * @description Receive a single Invoice Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, types, invoiceIds, user} = {}) {
    /**
     *
     * Retrieve Invoice Logs
     *
     * @description Receive a generator of InvoiceLog objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
     * @param invoiceIds [list of strings, default null]: list of Invoice ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of InvoiceLog objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        invoiceIds: invoiceIds,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, types, invoiceIds, user } = {}) {
    /**
     *
     * Retrieve paged Invoice Logs
     *
     * @description Receive a list of up to 100 Invoice.Log objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
     * @param invoiceIds [list of strings, default null]: list of Invoice ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Invoice.Log objects with updated attributes and cursor to retrieve the next page of Invoice.Log objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        invoiceIds: invoiceIds,
    };
    return rest.getPage(resource, query, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice.Log pdf file
     *
     * @description Receive a single Invoice.Log pdf file generated in the Stark Bank API by passing its id.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice.Log pdf file
     *
     */
    return rest.getPdf(resource, id, {}, user);
};
