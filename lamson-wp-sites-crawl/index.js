module.exports = function (context, req) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    
    var wp_service = "wplabs";
    var wp_environment = "prod";
    var wp_domain = "wplabs.wrdsb.ca";

    var messages = [];

    var sites = [
        'theme-unit-test',
        'wp-test',
        'template-theme-unit-test'
    ];

    sites.forEach(wp_site => {
        var message = {
            wp_service: wp_service,
            wp_environment: wp_environment,
            wp_domain: wp_domain,
            wp_site: wp_site
        };
        messages.push(JSON.stringify(message));
    });

    context.bindings.lamsonWpPostsList = messages;
};
