angular.module('app').service('Order', ['util','Global', function(util,Global) {
    this.order = {};
    this.activeCustomer = "";
    this.customerOrder = "";
    this.testr = 0;

    var that = this;

    this.selectCustomer = function(customer) {
        this.activeCustomer = customer;
        var cid = this.activeCustomer.customerID;
        if(!this.order[cid])
        {
          this.order[cid] = new orderTab(cid,customer,Global);
        }
        this.customerOrder = this.order[cid];
    };
}]);