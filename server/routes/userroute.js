var controller = require("../controllers/usercontroller");

var addListenersForUsersRequests = function(socket){
    controller.login(socket);
    controller.register(socket);
}

module.exports = {
    ACCOUNT_LISTENERS : addListenersForUsersRequests
}