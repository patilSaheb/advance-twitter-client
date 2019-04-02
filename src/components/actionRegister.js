var Actions = require('./actions.js');
var ACITONHOLDER = {};

if (typeof window !== 'undefined') {
    if (window.ACITONHOLDER === undefined) {
        window.ACITONHOLDER = ACITONHOLDER;
    }
}

var actions = {};
var registryAction = new Actions('actions-registry');

ACITONHOLDER.actions = {
    actionStatus : registryAction.actionStatus.bind(registryAction),
    selectedaction : registryAction.actionStatus.bind(registryAction),
    actionApi : registryAction.actionStatus.bind(registryAction)
}

