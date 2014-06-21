var level=null;
var horizon=0;
var textHeight;
var beat=250;
var wait=0;
var actions
$(function(){
    level = makeLevel($("#l1").get(0));
    $(document).keypress(function(evt){
	var action = actions[String.fromCharCode(evt.keyCode)];
	if(actions){
	    var $action = $(action).insertAfter(level.lines[horizon-1]);
	    level.lines.splice(horizon,0,$action);
	    process($action);
	}
    });
    textHeight = 30;
    setInterval(tick,beat);
});

var actions = {"a":"<p>You slashed your sword</p>","o":"<p>We circled 'round</p>"};


function makeLevel(el){
    var l = {element:el};
    l.lines = $(el).children();
    l.lines.each(function(i,line){process(line);});
    return l;
}

function process(line){
    $(line).css({opacity:0,display:'none'});
}


function tick(){
    if(wait<1){
	var $line = $(level.lines[horizon]);
	var b = $line.attr("b");
	if(!b)b=4;
	wait=b;
	var margin = $line.hasClass("new")?textHeight:0;
	$line.css({display:'block','line-height':0,'marginTop':0});
	$line.animate({opacity:1,'line-height':textHeight,'marginTop':margin},
		      beat);
	var $level = $(level.element);
	horizon++;
    }else{
	wait--;
    }
}

