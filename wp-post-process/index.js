module.exports = function (context, message) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    context.bindings.lamsonWpPostStore = message;
    context.bindings.lamsonWpPostNotify = message;
    context.bindings.lamsonWpPostSyndicate = message;

    context.done(null, message);
};
