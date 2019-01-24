module.exports = function (context, req) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    var raw_body = req.body;
    var post_string = JSON.parse(raw_body);
    var parsed_post = JSON.parse(post_string);

    parsed_post.post_id = parsed_post.ID;
    parsed_post.ID = `${parsed_post.site_url}-${parsed_post.post_id}`;
    parsed_post.ID = parsed_post.ID.replace(/\./g, '-');

    context.bindings.postToStore = JSON.stringify(parsed_post);

    context.res = {
        status: 200,
        body: raw_post
    };

    context.log(raw_post);
    context.done(null, raw_post);
};
