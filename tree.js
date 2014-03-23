var canv=document.createElement("canvas");
canv.setAttribute("id", "viewport");
canv.setAttribute("width", $(window).width()-16);
canv.setAttribute("height", $(window).height()-64);
document.body.appendChild(canv);


var sys = arbor.ParticleSystem();
sys.parameters({'gravity':true, 'repulsion':100, 'friction':.9});
sys.renderer = Renderer("#viewport");

function randcolor(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

var tree = {
  nodes:{A:{label:"Google", color:randcolor(), shape:"dot", alpha:1, link:'www.google.com', icon:null}, 
      B:{label:"YouTube", color:randcolor(), shape:"dot", alpha:1, link:'www.youtube.com', icon:null}, 
      C:{label:"WikiPedia", color:randcolor(), shape:"dot", alpha:1, link:'www.wikipedia.org', icon:null}, 
      D:{label:"Twitter", color:randcolor(), shape:"dot", alpha:1, link:'www.twitter.com', icon:null},
      E:{label:"Facebook", color:randcolor(), shape:"dot", alpha:1, link:'www.facebook.com', icon:null},
      F:{label:"Amazon", color:randcolor(), shape:"dot", alpha:1, link:'www.amazon.com', icon:null},
      G:{label:"Stack Overflow", color:randcolor(), shape:"dot", alpha:1, link:'www.stackoverflow.com', icon:null}
  },
  edges:{
      A:{B:{directed:true},C:{directed:true},D:{directed:true}},
      D:{E:{directed:true},F:{directed:true}},
      C:{G:{directed:true}}
  }
}
sys.graft(tree);

$(canv).mousedown(function(e){
            var pos = $(this).offset();
            var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
            var sel = sys.nearest(p);

            if (sel.node !== null){
            	if(sel.distance < 30){
                	window.location.href = 'http://' + sel.node.data.link;
            	}
            }
            return false;
        });
