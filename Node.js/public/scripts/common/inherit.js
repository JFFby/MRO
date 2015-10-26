function inherit(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    var f = new F();

    for (var prop in Child.prototype) f[prop] = Child.prototype[prop];
    Child.prototype = f;
    Child.prototype[Parent.prototype.__class_name] = Parent.prototype;
}