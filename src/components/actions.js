function Actions() {
    this.name = name;
    this.actionStatus = this.changeStatus;
    this.selectedaction = this.actionSelector;
    this.actionApi = this.apiSelector;
}

Actions.prototype = {
    changeStatus : function() {
        console.log('status changed');
    },
    actionSelector: function() {
        console.log('action selection');
    },
    apiSelector: function() {
        console.log('action api');
    }
}