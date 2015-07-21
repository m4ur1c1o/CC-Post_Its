var Board = function( selector ) {
  var self = this;
  
  function initialize() {
    self.$elem = $( selector );
    self.$elem.dblclick(function(a) {
      x = a.pageX + "px";
      y = a.pageY + "px";
      if (a.target == this) {
        self.addPostIt(x, y);
      };
    });
    self.deletePostIt();
  };

  initialize();
};

Board.prototype.addPostIt = function(x, y){
  var postIt = new PostIt();
  postIt.$elem.css({
    "position": "absolute",
    "left": x,
    "top": y
  });
  this.$elem.append(postIt.$elem);
};

Board.prototype.deletePostIt = function(){
  var self = this;
  this.$elem.on("click",".close", function(){
    $(this).parent().parent().remove();
  });
};

//////////////////////////////////////////////////////////////////
var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  var self = this;
  string = "<div class='post-it'><div class='header'><div class='close'>X</div></div><div class='content' contentEditable='true'></div></div>";

  function initialize () {
    self.$elem = $(string);
    self.$elem.draggable({
      handle: "div.header"
    });
  };

  PostIt.prototype.stopPropagation = function(){
    $(".post-it").on("dblclick", function(event){
      event.stopPropagation();
    });
  }
  initialize();
};  


////////////////////////////////////////////////////////////////////


$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  var board = new Board('#board');
  
});




