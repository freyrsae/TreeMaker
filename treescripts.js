var nodes = {1:{name: 1}};
var nodesCount = 1;

var links = [];


var width = 960,
    height = 500;

var force;


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

function refreshGraph(){

  svg.selectAll("*").remove();

  force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge(-500)
    .on("tick", tick)
    .start();

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

  var link = svg.selectAll(".link")
      .data(force.links())
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(force.nodes())
    .enter().append("g")
      .attr("class", "node")
      .on("click", mouseclick)
      .call(force.drag);


  node.append("circle")
      .attr("r", 8);

  node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

}

refreshGraph();


function mouseclick() {
  if (d3.event.defaultPrevented) return;
  force.stop();
  nodesCount++;
  var n = parseInt(d3.select(this).text());
  nodes[nodesCount] = {name: nodesCount};
  links.push({source: nodes[nodesCount], target: nodes[n]});
  refreshGraph();
}

