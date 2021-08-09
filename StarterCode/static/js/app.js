// Creating init function to load initial data
function init(){
    var dropdown = d3.select("selDataset");
    d3.json("samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown.append('option').text(name).property("value");
        });
        demInfo(data.names[0]);
        generatePlot(data.names[0]);
    });
};

//create the event handler
function optionChanged(id){
    demInfo(id);
    generatePlot(id);
};

//function to generate the demographic table
function demInfo(id){
    d3.json("samples.json").then((data) => {
        
    })
}

//Call init to initiate page
init();