// execute script when window is loaded
window.onload = function () {
    // SVG dimension variables
    var w = 900,
        h = 500;

    var container = d3.select('body') // get the <body> element from the DOM
        .append('svg') // put a new svg in the body.  The new svg is now selected
        .attr("width", w)
        .attr("height", h)
        .attr("class", "main-container") // always assign a class for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)");

    var innerRect = container.append('rect') // put a new rect in the svg
        .datum(400) // a single value is a datum
        .attr('width', function (d) {
            return d * 2; // 400 * 2 = 800
        })
        .attr('height', function (d) {
            return d; // 400
        })
        .attr('class', 'innerRect')
        .attr('x', 50)
        .attr('y', 50)
        .style('fill', '#FFFFFF');

    var cityPop = [
        {
            city: 'Richmond',
            population: 227032
        },
        {
            city: 'Norfolk',
            population: 242628
        },
        {
            city: 'Roanoke',
            population: 96714
        },
        {
            city: 'Virginia Beach',
            population: 442707
        }
    ];

    var x = d3.scaleLinear()
        .range([90,680])
        .domain([0,3]);
    
    var minPop = d3.min(cityPop, function(d) {
        return d.population;
    });
    
    var maxPop = d3.max(cityPop, function(d) {
        return d.population;
    });
    
    var y = d3.scaleLinear()
        .range([440, 50])
        .domain([0,550000]);
    
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
    
    var circles = container.selectAll('.circles')
        .data(cityPop)
        .enter()
        .append('circle')
        .attr('class', 'circles')
        .attr('id', function(d) {
            return d.city;
        })
        .attr('r', function (d, i) {
            let area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr('cx', function (d, i) {
            return x(i)
        })
        .attr('cy', function (d) {
            return y(d.population);
        })
        .style('fill', function(d,i) {
            return color(d.population)
        })
        .style('stroke', '#000');
    
    var yAxis = d3.axisLeft(y)
        .scale(y);
    
    var axis = container.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(50, 0)')    
        .call(yAxis);
    
    var title = container.append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', 450)
        .attr('y', 30)
        .text('City Populations');
    
    
    var format = d3.format(',');
    
    var labels = container.selectAll('.labels')
        .data(cityPop)
        .enter()
        .append('text')
        .attr('class', 'labels')
        .attr('text-anchor', 'left')
        .attr('y', function(d) {
            return y(d.population) + 5;
        });
    
    var nameLine = labels.append('tspan')
        .attr('class', 'nameLine')
        .attr('x', function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d) {
            return d.city;
        });
    
    var popLine = labels.append('tspan')
        .attr('class', 'popLine')
        .attr('x', function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d) {
            return 'Pop. ' + format(d.population);
        })
        .attr('dy', '15');

};
