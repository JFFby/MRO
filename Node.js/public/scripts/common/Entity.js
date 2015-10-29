(function () {
    function findMaxLeftPx() {
        return _.min(this.Pixels, 'X');
    }

    function findMaxRightPx() {
        return _.max(this.Pixels, 'X');
    }

    function findMaxTopPx() {
        return _.min(this.Pixels, 'Y')
    }

    function findMaxBottomPx() {
        return _.max(this.Pixels, 'Y')
    }

    var imgEntity = function (obj) {

        this.Number = obj.number;
        this.Color = obj.color;
        this.Pixels = obj.pixels; // Array
        this.MaxLeftPx = findMaxLeftPx.apply(this);
        this.MaxRightPx = findMaxRightPx.apply(this);
        this.MaxTopPx = findMaxTopPx.apply(this);
        this.MaxBottomPx = findMaxBottomPx.apply(this);
        this.Height = this.MaxBottomPx.Y - this.MaxTopPx.Y + 1;
        this.Width = this.MaxRightPx.X - this.MaxLeftPx.X + 1;
    }

    this.imgEntity = imgEntity;
})()