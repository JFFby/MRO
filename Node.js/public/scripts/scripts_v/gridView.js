
    var modelLimit = {
        right: ko.observable(),       
        left: ko.observable(0), 
    };

	var objectCount = 0;
	var buffInitialData = [];
    var initialData = [
        { number: 1, color:'red', pixelCount: 352, leftLimit: 75.95, rightLimit: 75.95, upperLimit: 75.95, lowerLimit: 75.95, height:0, width:0 },
        { number: 2, color:'green', pixelCount: 89, leftLimit: 79.95, rightLimit: 75.95, upperLimit: 75.95, lowerLimit: 75.95, height:0, width:0 },
        { number: 3, color:'blue', pixelCount: 152, leftLimit: 75.95, rightLimit: 75.95, upperLimit: 75.95, lowerLimit: 75.95, height:0, width:0 },
        { number: 4, color:'black', pixelCount: 324, leftLimit: 72.95, rightLimit: 75.95, upperLimit: 75.95, lowerLimit: 75.95, height:0, width:0 }
    ];
   
    var PagedGridModel = function(items) {
    	
        this.items = ko.observableArray(items);

    
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
              
            ],
            pageSize: 15
        });
    };

    var gridModel = new PagedGridModel(initialData);
    ko.applyBindings(gridModel);


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



var ob = {
	qwe:12,
}; 
var obj = conversion(ob);
gridModel.addItem(obj);
