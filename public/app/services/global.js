angular.module('app').factory("Global", [function() {
    var _this = this;
    _this._data = {
        user: window.user,
        authenticated: !! window.user,
        taxRate: "0.08"
    };

    return _this._data;
}]);