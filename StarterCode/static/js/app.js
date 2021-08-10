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
        var meta = data.metadata;
        var result = meta.filter( meta => meta.id == id)[0];
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");
        Object.entries(result).forEach((key) =>{
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
};

//Call init to initiate page
init();