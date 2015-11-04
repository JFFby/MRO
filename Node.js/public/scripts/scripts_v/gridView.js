var PagedGridModel = function(config) {
     
    this.modelLimit = {
        right: ko.observable(),
        left: ko.observable(0),
    };

    var service = new previewFetcher({
        url: config.fileName,
        callback: function(data, tr) {
            data = JSON.parse(data);
            var size = data.size | 100;
            var td = tr.find('td:last');
            td.html("<img  width='"+size+"' height='"+size + "' src='" + data.url + "'></img>");
        }
    });

    var buffInitialData = [];

    this.items = ko.observableArray(convertation(config.objects));

    
    this.addItem = function(obj) {
        this.items.push(obj);
    };

    this.sortNumber = function() {
        this.items.sort(function(a, b) {
            return a.number < b.number ? -1 : 1;
        });
          
    };

    this.sortLimit = function() {
        var leftLimit = 1*modelLimit.left(),
        rightLimit = 1*modelLimit.right() || 1000000000000000;

        for(var i = 0;i<this.items().length;i++){
            if(this.items()[i].leftLimit<leftLimit || this.items()[i].rightLimit>rightLimit){		
                this.delete(i);	
                i--;		
            }

                
        }
          
    };

    this.sortPixelCount = function() {
        this.items.sort(function(a, b) {
            return a.pixelCount < b.pixelCount ? 1 : -1;
        });
    };

    this.delete = function(number) {
        buffInitialData.splice(0,0,this.items.splice(number,1)[0]);
    };

    this.reset = function() {
        var length=buffInitialData.length;
        for(var i=0;i<length;i++)
            this.addItem(buffInitialData[i]);
        buffInitialData.splice(0,length);
        this.sortPixelCount();
    };

    this.jumpToFirstPage = function() {
        this.gridViewModel.currentPageIndex(0);
    };

    this.gridViewModel = new ko.simpleGrid.viewModel({
        data: this.items,
        columns: [
            { headerText: "Object №", rowText: "number" },
            { headerText: "Color", rowText: "color" },
            { headerText: "Pixel count", rowText: "pixelCount" },
            { headerText: "Left limit", rowText: "leftLimit" },
            { headerText: "Right limit", rowText: "rightLimit" },
            { headerText: "Upper limit", rowText: "upperLimit" },
            { headerText: "Lower limit", rowText: "lowerLimit" },
            { headerText: "Height", rowText: "height" },
            { headerText: "Width", rowText: "width" },
            { headerText: "Prewie", rowText: "na" }
        ],
        pageSize: 15,
        afterRender: function(element) {
            for (var i = 0; i < element.length; ++i) {
                if (element[i].nodeType == 1) {
                    var tr = $(element[i]);
                    var number = tr.find('td:first').html();
                    service.loadImg(number, tr);
                    break;
                }
            }
        } 
    });
};

function conversion(obj){
    var array = [],j = 0,
	gridObj = {
	    number:0,
	    color:'',
	    pixelCount:0,
	    leftLimit:0,
	    rightLimit:0,
	    upperLimit:0,
	    lowerLimit:0,
	    height:0,
	    width:0
	};

	
    for (i in obj) {
        array[j]=obj[i];
        j++;
    }

    j = 0;
    for (i in gridObj) {
        if(array[j])
            gridObj[i]=array[j];
        j++;
    }
	 
    return gridObj;
}


var convertation = function (array) {
    var result = [];
    for (var i = 0, l = array.length; i < l; ++i) {
        var sourse = array[i];
        result.push({
            number: sourse.Number,
            color: sourse.Color,
            pixelCount: sourse.Pixels,
            leftLimit: sourse.MaxLeftPx.X,
            rightLimit: sourse.MaxRightPx.X,
            upperLimit: sourse.MaxTopPx.Y,
            lowerLimit: sourse.MaxBottomPx.Y,
            height: sourse.Height,
            width: sourse.Width,
            na: "N/A"
        });
    }

    return result;
}