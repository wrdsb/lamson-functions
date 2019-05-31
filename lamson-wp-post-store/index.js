module.exports = function (context, message) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    var parsed_post = message;
    var site_domain = parsed_post.site_domain;  // "staff.wrdsb.ca"
    var site_url = parsed_post.site_url;         // "staff.wrdsb.ca/its-team"
    var visible_to = [];

    switch (parsed_post.site_privacy) {
        case '-1':
            visible_to.push(`${site_domain}:members`);
            visible_to.push(`${site_url}:members`);
            visible_to.push(`${site_url}:admins`);
            break;
        case '-2':
            visible_to.push(`${site_url}:members`);
            visible_to.push(`${site_url}:admins`);
            break;
        case '-3':
            visible_to.push(`${site_url}:admins`);
            break;
        case '0':
            visible_to.push(`${site_domain}:members`);
            visible_to.push(`${site_url}:members`);
            visible_to.push(`${site_url}:admins`);
            visible_to.push('public');
            break;
        case '1':
            visible_to.push(`${site_domain}:members`);
            visible_to.push(`${site_url}:members`);
            visible_to.push(`${site_url}:admins`);
            visible_to.push('public');
            break;
        default:
            break;
    }

    parsed_post.visible_to = visible_to;

    context.bindings.postToStore = parsed_post;

    let event = {
        id: 'lamson-functions-' + context.executionContext.functionName +'-'+ context.executionContext.invocationId,
        eventType: 'Lamson.WP.Post.Store',
        eventTime: execution_timestamp,
        data: {
            event_type: 'function_invocation',
            app: 'wrdsb-lamson',
            function_name: context.executionContext.functionName,
            invocation_id: context.executionContext.invocationId,
            data: parsed_post,
            timestamp: execution_timestamp
        },
        dataVersion: '1'
    };

    context.bindings.callbackMessage = JSON.stringify(event);

    context.log(parsed_post);
    context.done(null, parsed_post);
};
