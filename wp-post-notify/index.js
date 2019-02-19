module.exports = function (context, req) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env['SENDGRID_API_KEY']);

    var parsed_post = req.body;

    if (parsed_post.post_type != 'post') {
        context.done(null, "Not a post.");
    }

    var site_domain = parsed_post.site_domain;
    var site_slug = parsed_post.site_slug;
    var site_name = parsed_post.site_name;

    var id = parsed_post.id;
    var post_title = parsed_post.post_title;
    var post_content = parsed_post.post_content;
    var post_guid = parsed_post.post_guid;

    var notification = {
        subject: post_title
    };

    switch (site_domain) {
        case 'staff.wrdsb.ca':
            notification.to = `intranet-${site_slug}@wrdsb.ca`;
            notification.from = {
                email: `intranet-${site_slug}@lamson.wrdsb.ca`,
                name: site_name
            };
            notifictaion.html = `${post_content} <p>Originally published on the Staff Intranet here: ${post_guid}</p>`
            break;
    
        default:
            notification.to = 'james_schumann@wrdsb.ca';
            notification.from = {
                email: 'notifications@lamson.wrdsb.io',
                name: 'Lamson Test Notifications'
            };
            notification.html = `${post_content} <p>Originally here: ${post_guid}</p>`
            break;
    }

    sgMail.send(notification, (error, result) => {
        if (error) {
            context.res = {
                status: 500,
                body: error
            };

            context.log(error);
            context.done(error);

        } else {
            var notification_to_store = notification;
            notification_to_store.lamson_id = id;
            notification_to_store.created_at = execution_timestamp;

            notification_to_store.result = result;
            notification_to_store.result[0].request.headers.Authorization = 'redacted';
            context.bindings.notificationToStore = JSON.stringify(notification_to_store);

            context.res = {
                status: 200,
                body: notification_to_store
            };

            context.log(notification_to_store);
            context.done(null, notification_to_store);
        }
    });
};
