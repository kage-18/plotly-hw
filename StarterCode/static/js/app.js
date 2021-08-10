// Creating init function to load initial data
function init(){
    var dropdown = d3.select("selDataset");
    d3.json("./samples.json").then((data) => {
        data.names.forEach((name)=> {
            dropdown.append("option").text(name);
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
    d3.json("./samples.json").then((data) => {
        var meta = data.metadata;
        var result = meta.filter( meta => meta.id == id)[0];
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");
        Object.entries(result).forEach((key) =>{
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
};

//bar and bubble charts
function generatePlot(id){
    d3.json("./samples.json").then((data)=> {
        var samples = data.samples.filter(s => s.id == id)[0];
        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d)

        var labels = samples.otu_labels.slice(0, 10);

        //Bar plot
        var trace_bar = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        var data_bar = [trace_bar];
        var layout_bar = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            }
        };
        Plotly.newPlot("bar", data_bar, layout_bar);

        // Bubble chart
        var trace_bub = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
        var data_bub = [trace_bub];
        var layout_bub = {
            xaxis:{title: "OTU ID"},
            height: 700,
            width: 1200
        };
        Plotly.newPlot("bubble", data_bub, layout_bub); 
    });
};

//Call init to initiate page
init();