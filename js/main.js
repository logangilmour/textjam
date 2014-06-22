var horizon=0;
var textHeight;
var beat=250;
var wait=0;
var stop=false;
var act = null;
var dead = false;
var $lines;
$(function(){
    $('body').append("<div id='blackout'>Press Spacebar to Retry...</div>");
    $('body').append("<div id='weapons-holder'><span id='weapons'>Weapons</span></div>");
    $('#holder').offset({left:$(window).width()/2-200});
    var letters=["A","S","D","F"];
    var off=4-actions.length;
    for(var i=0;i<4;i++){
	console.log(i-off);
	$("<div class='action'>"+(
	  ((i-off)>=0)?("<div class='word'>"+actions[i-off].name+"</div>"):"")+
	 "<div class='letter'>["+letters[i]+"]</div></div>").appendTo("body").css({left:(25*i)+'%'});
    }
    $(".challenge").each(function(i,el){
	var test = tests[Math.floor(Math.random()*tests.length)%tests.length];
	$(el).after("<p b='2' class='new s'>"+test.start+"</p><p b='2' class='e'>"+test.end+"</p>").remove();
    });
    $lines = $("#holder").children();
    $lines.each(function(i,line){process(line);});

    $(document).keydown(function(evt){
	if(dead && evt.keyCode==32)
	{
	    evt.preventDefault();
	    location.reload();
	}
	    
	if(!act){
	 
	var action = actions[String.fromCharCode(evt.keyCode)];
	    if(action){

		}
	if(actions){
	    
	    var $action = $(action).insertAfter($lines[horizon-1]);
	    $lines = $("#holder").children();
	    process($action);
	}
	}
    });
    textHeight = 30;
    setInterval(tick,beat);
});

function process(line){
    var $line = $(line);
    $line.css({opacity:0,display:'none'});
    if($line.is("a")){
	$line.click(function(evt){
	    evt.preventDefault();
	    stop=true;

	    $('body').fadeOut(1000,function(){
		window.location = $line.attr("href");
	    });
	});
    }
}


function tick(){
    if(stop)return;

    if(wait<1){

	var $line = $($lines[horizon]);
	var b = $line.attr("b");
	if(!b)b=4;
	wait=b;
	var margin = $line.hasClass("new")?textHeight:0;
	$line.css({display:'block','line-height':0,'marginTop':0});
	$line.animate({opacity:1,'line-height':textHeight,'marginTop':margin},
		      beat);
		if($line.hasClass("e")){
	    $('#blackout').fadeIn(3000);
	    stop=true;
		    dead=true;
	    return;
	}
	horizon++;
    }else{
	wait--;
    }
}

