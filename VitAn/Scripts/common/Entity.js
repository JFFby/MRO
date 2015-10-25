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

  var imgEntity = function (obj) {

      this.Number = obj.number;
      this.Color = obj.color;
      this.Pixels = obj.pixels; // Array
        this.MaxLeftPx = findMaxLeftPx.apply(this);
        this.MaxRightPx = findMaxRightPx.apply(this);
        this.MaxTopPx = findMaxTopPx.apply(this);
        this.MaxBorromPx = findMaxBottomPx.apply(this);
  }

  this.imgEntity = imgEntity;
})()