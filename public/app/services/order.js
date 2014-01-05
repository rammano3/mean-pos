angular.module('app').service('Order', ['util', function(util) {
    this.order = {};
    this.activeCustomer = "";
    this.customerOrder = "";
    this.testr = 0;

    var that = this;

    this.addToOrder = function(item){
        var newItem = true;
        var cid = this.activeCustomer.customerID;
        angular.forEach(this.order[cid].items, function(orderItem) {
            if(item.name == orderItem.name)
            {
                orderItem.quantity += 1;
                newItem = false;
            }
        });
        if(newItem){
            this.order[cid].items.push({name: item.name, quantity: 1});
        }
        this.order[cid].orderQuantity += 1;
        this.customerOrder = this.order[cid];
    };

    this.selectCustomer = function(customer) {
        this.activeCustomer = customer;
        var cid = this.activeCustomer.customerID;
        if(!this.order[cid])
        {
            //new customer
            this.order[cid] = {
                customerName : customer.customerName,
                customerID: cid,
                items: [],
                orderTotal: 0.00,
                orderQuantity: 0,
                activeClass: 'active'
            };
        }else{
            this.order[cid].activeClass = 'active';
        }
        this.customerOrder = this.order[cid];
    };
}]);