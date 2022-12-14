// Thank you to Dom for much of this code; I attended his tutorial session.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);
    
    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}

function demoData(sampleId) {
    console.log(`demoData(${sampleId})`);

    d3.json(url).then(data => {

        let metaData = data.metadata;
        let resultArray = metaData.filter(s => s.id == sampleId);
        let result = resultArray[0];

        keyArray = []
        let keys = Object.keys(result);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            keyArray.push(key);
        }

        valueArray = []
        let metaValues = Object.values(result);
        for (let i = 0; i < metaValues.length; i++) {
            let value = metaValues[i];
            valueArray.push(value);
        }

        keyValuePairs = [[keyArray], [valueArray]];

        document.getElementById("sample-metadata").innerHTML = 

            [(`${[keyArray[0]]}: ${[valueArray[0]]}`) + "<br />"
            + (`${[keyArray[1]]}: ${[valueArray[1]]}`) + "<br />"
            + (`${[keyArray[2]]}: ${[valueArray[2]]}`) + "<br />"
            + (`${[keyArray[3]]}: ${[valueArray[3]]}`) + "<br />"
            + (`${[keyArray[4]]}: ${[valueArray[4]]}`) + "<br />"
            + (`${[keyArray[5]]}: ${[valueArray[5]]}`) + "<br />"
            + (`${[keyArray[6]]}: ${[valueArray[6]]}`) + "<br />"
            ];

    });
}

function drawBubbleGraph(sampleId) {
    console.log(`drawBubbleGraph(${sampleId})`);

    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let bubbleArray = [bubbleData];

        let bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });
}

function drawGauge(sampleId) {
    console.log(`drawGauge(${sampleId})`);
}

function optionChanged(sampleId) {
    console.log(`optionChanged: ${sampleId}`);

    drawBargraph(sampleId);
    demoData(sampleId);
    drawBubbleGraph(sampleId);
    drawGauge(sampleId);
}

function InitDashboard() {

    console.log("InitDashboard()");

    let selector = d3.select("#selDataset");

    d3.json(url).then(data => {
        console.log(data)

        let sampleNames = data.names;

        console.log(sampleNames);

        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            selector.append("option").text(sampleId).property("value", sampleId);
        }

        let initialId = selector.property("value");

        drawBargraph(initialId);

        drawBubbleGraph(initialId);

        demoData(initialId);

        drawGauge(initialId);

    });
}

InitDashboard();