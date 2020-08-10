const cmsRoutes = require("./cms_routes");

module.exports = function(app, db){
    cmsRoutes(app , db)
}