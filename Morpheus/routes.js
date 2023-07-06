const routes = require('next-routes')();

routes
    .add('/wahlen/new', '/wahlen/new')
    .add('/wahlen/new', '/wahlen/vote')
    .add('/wahlen/:address', '/wahlen/show')
    .add('/wahlen/:address/voting', '/wahlen/voting/index')
    .add('/wahlen/:address/voting/exit', '/wahlen/voting/exit');

module.exports = routes;