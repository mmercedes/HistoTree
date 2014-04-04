var canv=document.createElement("canvas");
canv.setAttribute("id", "viewport");
canv.setAttribute("width", window.innerWidth-16);
canv.setAttribute("height", $(window).height()-48);
document.body.appendChild(canv);


var sys = arbor.ParticleSystem();
sys.parameters({'gravity':false, 'repulsion':20, 'friction':.6});
sys.renderer = Renderer("#viewport");



// function randcolor(){
// 	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
// }

var strToHex = function(str) {

	hash = 0;

    // str to hash
    for (var i = 0; i < str.length; i++){
    	if(str[i] == '/') break;
    	hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // int/hash to hex
    for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));

    return colour;
}


var tree = {
  nodes:{A:{label:"Google", shape:"dot", alpha:1, link:'www.google.com', icon:null}, 
      B:{label:"YouTube", shape:"dot", alpha:1, link:'www.youtube.com', icon:null}, 
      C:{label:"WikiPedia", shape:"dot", alpha:1, link:'www.wikipedia.org', icon:null}, 
      D:{label:"Twitter", shape:"dot", alpha:1, link:'www.twitter.com', icon:null},
      E:{label:"Facebook", shape:"dot", alpha:1, link:'www.facebook.com', icon:null},
      F:{label:"Amazon", shape:"dot", alpha:1, link:'www.amazon.com', icon:null},
      G:{label:"Stack Overflow", shape:"dot", alpha:1, link:'www.stackoverflow.com', icon:null},
      H:{label:"Dog", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Dog', icon:null},
      I:{label:"Cat", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Cat', icon:null},
      J:{label:"Bear", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Bear', icon:null},
      K:{label:"Wolf", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Wolf', icon:null},
      L:{label:"Dolphin", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Dolphin', icon:null},
      M:{label:"Fish", shape:"dot", alpha:1, link:'www.wikipedia.org/wiki/Fish', icon:null}
  },
  edges:{
      A:{B:{directed:true},C:{directed:true},D:{directed:true}},
      D:{E:{directed:true},F:{directed:true}},
      G:{A:{directed:true}},
      C:{H:{directed:true},I:{directed:true},J:{directed:true},K:{directed:true},L:{directed:true},M:{directed:true}}
  }
}

tree.nodes.A.color = strToHex(tree.nodes.A.link);
tree.nodes.B.color = strToHex(tree.nodes.B.link);
tree.nodes.C.color = strToHex(tree.nodes.C.link);
tree.nodes.D.color = strToHex(tree.nodes.D.link);
tree.nodes.E.color = strToHex(tree.nodes.E.link);
tree.nodes.F.color = strToHex(tree.nodes.F.link);
tree.nodes.G.color = strToHex(tree.nodes.G.link);
tree.nodes.H.color = strToHex(tree.nodes.H.link);
tree.nodes.I.color = strToHex(tree.nodes.I.link);
tree.nodes.J.color = strToHex(tree.nodes.J.link);
tree.nodes.K.color = strToHex(tree.nodes.K.link);
tree.nodes.L.color = strToHex(tree.nodes.L.link);
tree.nodes.M.color = strToHex(tree.nodes.M.link);

sys.graft(tree);

$(canv).mousedown(function(e){
            var pos = $(this).offset();
            var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
            var sel = sys.nearest(p);

            if (sel.node !== null){
            	if(sel.distance < 32){
                	window.location.href = 'http://' + sel.node.data.link;
            	}
            }
            return false;
        });

window.onresize=function(){
	//window.location.reload()
	canv.setAttribute("width", $(window).width()-16);
	canv.setAttribute("height", $(window).height()-64);
	sys.prune();
	sys.graft(tree);
};