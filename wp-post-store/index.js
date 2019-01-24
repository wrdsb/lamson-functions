module.exports = function (context, req) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    var raw_post = req.body;

    context.bindings.postToStore = raw_post;

    context.res = {
        status: 200,
        body: raw_post
    };

    context.log(raw_post);
    context.done(null, raw_post);
};
