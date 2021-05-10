import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import actionTypes from "../action/types";

const CHANGE_EVENT = "change";
let _tasks = [];

class Store extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getTasks() {
        return _tasks;
    }   
}

const store = new Store();

dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS:
            store.emitChange();
            break;

        case actionTypes.REQUEST_SUCCESS: {
            _tasks = action.tasks;
            store.emitChange();
            break;
        }
        case actionTypes.REQUEST_FAILURE: {
            _tasks=[];
            store.emitChange();
            break;
        }    
  
        default:
            console.log("no action")
    }
});

export default store;