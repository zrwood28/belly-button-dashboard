// Thanks to Dom for much of this code; I attended his tutorial session.
function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);
}

function demoData(sampleId) {
    console.log(`demoData(${sampleId})`);
}

function drawBubbleGraph(sampleId) {
    console.log(`drawBubbleGraph(${sampleId})`);
}

function drawGauge(sampleId) {
    console.log(`drawGauge(${sampleId})`);
}


function InitDashboard() {

    console.log("InitDashboard()");

    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

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