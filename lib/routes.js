'use strict';

// register handlers
exports.register = function(server, middleware) {
    // api get cluster state
    server.get('/:api_version/cluster/state', middleware.get_handler('cluster', 'state'), middleware.handle_response);

    // shutdown containership processes across cluster
    server.delete('/:api_version/cluster', middleware.get_handler('cluster', 'delete'), middleware.handle_response);

    // api get applications
    server.get('/:api_version/applications', middleware.get_handler('applications', 'get'), middleware.handle_response);

    // api create applications
    server.post('/:api_version/applications', middleware.get_handler('applications', 'create'), middleware.handle_response);

    // api get application
    server.get('/:api_version/applications/:application', middleware.get_handler('application', 'get'), middleware.handle_response);

    // api create application
    server.post('/:api_version/applications/:application', middleware.get_handler('application', 'create'), middleware.handle_response);

    // api update application
    server.put('/:api_version/applications/:application', middleware.get_handler('application', 'update'), middleware.handle_response);

    // api delete application
    server.delete('/:api_version/applications/:application', middleware.get_handler('application', 'delete'), middleware.handle_response);

    // api get application containers
    server.get('/:api_version/applications/:application/containers', middleware.get_handler('application', 'get_containers'), middleware.handle_response);

    // api create application container
    server.post('/:api_version/applications/:application/containers', middleware.get_handler('application', 'create_containers'), middleware.handle_response);

    // api delete application containers
    server.delete('/:api_version/applications/:application/containers', middleware.get_handler('application', 'remove_containers'), middleware.handle_response);

    // api get application container
    server.get('/:api_version/applications/:application/containers/:container', middleware.get_handler('application', 'get_container'), middleware.handle_response);

    // api delete application container
    server.delete('/:api_version/applications/:application/containers/:container', middleware.get_handler('application', 'remove_container'), middleware.handle_response);

    // api get hosts
    server.get('/:api_version/hosts', middleware.get_handler('hosts', 'get'), middleware.handle_response);

    // api get host
    server.get('/:api_version/hosts/:host', middleware.get_handler('host', 'get'), middleware.handle_response);

    // api update host
    server.put('/:api_version/hosts/:host', middleware.get_handler('host', 'update'), middleware.handle_response);

    // api delete host
    server.delete('/:api_version/hosts/:host', middleware.get_handler('host', 'delete'), middleware.handle_response);

    // api get variables
    server.get('/:api_version/variables', middleware.get_handler('variables', 'get'), middleware.handle_response);

    // api create variable
    server.post('/:api_version/variables/user/:variable', middleware.get_handler('variable', 'create'), middleware.handle_response);

    // api get variable
    server.get('/:api_version/variables/user/:variable', middleware.get_handler('variable', 'get'), middleware.handle_response);

    // api update variable
    server.put('/:api_version/variables/user/:variable', middleware.get_handler('variable', 'update'), middleware.handle_response);

    // api delete variable
    server.delete('/:api_version/variables/user/:variable', middleware.get_handler('variable', 'delete'), middleware.handle_response);
};
