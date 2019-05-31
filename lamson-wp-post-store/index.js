module.exports = function (context, message) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    var parsed_post = message.MessageText;

    context.bindings.postToStore = JSON.stringify(parsed_post);

    context.res = {
        status: 200,
        body: parsed_post
    };

    context.log(parsed_post);
    context.done(null, parsed_post);
};
