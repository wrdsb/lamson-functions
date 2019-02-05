module.exports = function (context, req) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    var parsed_post = req.body;

    var notification = {
        to: 'james_schumann@wrdsb.ca',
        from: 'notifications@lamson.wrdsb.io',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail.send(msg);

    context.bindings.notificationToStore = JSON.stringify(notification);

    context.res = {
        status: 200,
        body: notification
    };

    context.log(notification);
    context.done(null, notification);
};
