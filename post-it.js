//////////////////////////////////////////////////////////////////

//BOARD

//////////////////////////////////////////////////////////////////
var Board = function( selector ) {
  var self = this;
  var boardList = new List();
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
    "top": y,
    "z-index": ++PostIt.zIndex
  });
//  self.boardList.push(postIt.$elem);
  this.$elem.append(postIt.$elem);
};

Board.prototype.deletePostIt = function(){
  var self = this;
  this.$elem.on("click",".close", function(){
    $(this).parent().parent().remove();
  });
};

//////////////////////////////////////////////////////////////////

//POST IT

//////////////////////////////////////////////////////////////////
var PostIt = function() {
  var self = this;
  string = "<div class='post-it'><div class='header'><div class='close'>X</div></div><div class='content' contentEditable='true'></div></div>";

  function initialize () {
    self.$elem = $(string);
    self.moveToFront();
    self.$elem.draggable({
      handle: "div.header"
    });
  };

  initialize();
};  

PostIt.prototype.stopPropagation = function(){
  $(".post-it").on("dblclick", function(event){
    event.stopPropagation();
  });
}

PostIt.prototype.moveToFront = function(){
  this.$elem.on("mousedown", function(event){
    $(this).css({
      "z-index": ++PostIt.zIndex
    });
  });
}

PostIt.zIndex = 0;

////////////////////////////////////////////////////////////////////

//LIST

////////////////////////////////////////////////////////////////////
var List = function(){ //selector
  var self = this;
  function initialize(){
    self.array = new Array();
    // self.element = $(selector);
  };

  initialize();
};

List.prototype.select = function(){
  $("li").on("click", function(){
    alert("dimos click");
  });
}

////////////////////////////////////////////////////////////////////

$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  
  // var zindex = 0;
  // $(".post-it").on("click", function(){
  //   console.log("entramos");
  //   $(this).style.zIndex = ++zindex;
  // });
  $("#new_board").on("click", function(){
    var boardName = prompt("Name of the board:");
    $("#boards").append("<li class='lista'>" + boardName + "</li>");
    var list = new List();
    list.select();
    // $(".list-end").before("<p class='list'>" + boardName + "</p>");
    var board = new Board("#board");

  });
});







