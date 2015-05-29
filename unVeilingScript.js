var realnodes = {}
for (var i = 10 - 1; i >= 1; i--) {
  realnodes[i] = {name: i};
};
var reallinks = [{source: realnodes[1], target: realnodes[2]},
{source: realnodes[2], target: realnodes[3]},
{source: realnodes[3], target: realnodes[4]},
{source: realnodes[4], target: realnodes[5]},
{source: realnodes[5], target: realnodes[6]},
{source: realnodes[6], target: realnodes[7]},
{source: realnodes[7], target: realnodes[8]},
{source: realnodes[8], target: realnodes[9]},
{source: realnodes[9], target: realnodes[1]},
{source: realnodes[3], target: realnodes[5]},
{source: realnodes[4], target: realnodes[6]},
{source: realnodes[8], target: realnodes[5]}

                ]

var nodes = {};
nodes[1] = realnodes[1];
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
  var n = parseInt(d3.select(this).text());
  addLinks(n, true);
  refreshGraph();
}

function addLinks(n, addNodes) {
  for (var i = reallinks.length - 1; i >= 0; i--) {
    var s = parseInt(reallinks[i].source.name);
    var t = parseInt(reallinks[i].target.name);
    if (n == s || n == t) {
      var k = n == s ? t : s;
      if (addNodes) {
        nodes[k] = realnodes[k];
        links.push(reallinks[i]);
        addLinks(k, false);
      }else{
        if (nodes[k]) {
          links.push(reallinks[i]);  
        };
      };
    };
  };  
}


