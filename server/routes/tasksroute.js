var controller = require("../controllers/taskcontroller");

var addListenersForTaksRequests = function(socket){
    controller.getTasks(socket);
    controller.deleteTask(socket);
    controller.downloadFile(socket);
    controller.createTask(socket);
    controller.updateTask(socket);
}

module.exports = {
    TASK_LISTENERS : addListenersForTaksRequests
}