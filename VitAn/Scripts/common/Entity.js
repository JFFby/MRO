(function () {
    function findMaxLeftPx() {
        //need to implement;
        // find in this.Pixels
        return this.Number * 3;
    }

    function findMaxRightPx() {
        //need to implement;
    }

    function findMaxTopPx() {
        //need to implement;
    }

    function findMaxBottomPx() {
        //need to implement;
        return 3;
    }

  var imgEntity = function (number, color, pixels) {

        this.Number = number;
        this.Color = color;
        this.Pixels = pixels; // Array
        this.MaxLeftPx = findMaxLeftPx.apply(this);
        this.MaxRightPx = findMaxRightPx.apply(this);
        this.MaxTopPx = findMaxTopPx.apply(this);
        this.MaxBorromPx = findMaxBottomPx.apply(this);
  }

  this.imgEntity = imgEntity;
})()