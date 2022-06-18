$(document).ready(function () {
  function createSnake() {
    // using jQuery to grab the #snake div and style it
    let snake = $('#snake');
    let xCoord = Math.floor(Math.random() * 355 + 30);
    let yCoord = Math.floor(Math.random() * 355 + 30);
    snake.css({
      'background-color': '#eee',
      width: '15px',
      height: '15px',
      'z-index': '1000',
      position: 'absolute',
      // marginTop: '5px',
      // marginLeft: '5px',
      marginTop: yCoord,
      marginLeft: xCoord,
      border: '1px solid gold',
    });
  }

  // what if:
  // store body in array
  // figure out how I need to draw out the margin
  // figure out how body part needs to appear next to the last item in array
  // if array is empty than the body needs to appear next to the head
  // figure how the margin needs to change based on snake's head movement
  // change margin based on the part of the body 'in front'

  function createBody() {
    // $('html').prepend("<div id='body'></div>");
    // let body = $('#body');
    // body.css({
    //   'background-color': '#eee',
    //   width: '35px',
    //   height: '35px',
    //   'z-index': '1000',
    //   position: 'absolute',
    //   marginTop: '5px',
    //   marginLeft: '5px',
    //   marginTop: yCoord,
    //   marginLeft: xCoord,
    //   border: '1px solid gold',
    // });

    $('#snake').prepend("<div id='body'></div>");
    let body = $('#body');

    // using math to randomly set the body's margin values
    let xCoord = Math.floor(Math.random() * 355 + 30);
    let yCoord = Math.floor(Math.random() * 355 + 30);

    body.css({
      'background-color': '#eee',
      width: '13px',
      height: '13px',
      'z-index': '1000',
      position: 'absolute',
      marginTop: '5px',
      marginLeft: '5px',
      marginTop: yCoord,
      marginLeft: xCoord,
      border: '1px solid gold',
    });
  }

  // gonna try out some other ideas for a bit
  // function getBig() {}
  // found a simple yet NONE DRY way to accomplish my idea
  // wasn't as fun as i thougt it would be

  // function createSnakeTail() {
  //   let snake = $('#snake');
  //   snake.after('<div id="tail"></div>');
  // let snakeHeadX = snake;
  // let snakeHeadY = ;
  //   let tail = $('#tail');
  //   tail.css({
  //     'background-color': '#eee',
  //     width: '10px',
  //     height: '10px',
  //     'z-index': '1000',
  //     position: 'absolute',
  //     marginTop: '5px',
  //     marginLeft: '5px',
  //   });
  //   tail.draggable({
  //     drag: function (event, ui) {
  //       tail.css({
  //         top: ui.position.top,
  //         left: ui.position.left,
  //       });
  //     },
  //   });
  // }

  function createFood() {
    // create food logic
    // here jQuery is used to create a div with the id of food
    // after setting a variable of food to the food div
    // jQuery is used for styling
    // food is prepend to 'html' for stability
    // appending to snake causes snakelike behavior
    // appending to canvas causes food to disappear
    $('#food').remove();

    $('html').prepend("<div id='food'></div>");
    let food = $('#food');

    // using math to randomly set the food's margin values
    let xCoord = Math.floor(Math.random() * 355 + 30);
    let yCoord = Math.floor(Math.random() * 355 + 30);

    food.css({
      'background-color': '#FF0000',
      width: '10px',
      height: '10px',
      'z-index': '1000',
      position: 'absolute',
      marginTop: yCoord,
      marginLeft: xCoord,
    });
    // end food logic
    // createSnakeTail();
  }

  // snake movement logic
  function enableFastFeedback(event) {
    // console.log(event.keyCode);
    // using jQuery method event.which to determine which keyboard key was pressed
    // i'm looking for the arrow keys UP, DOWN, RIGHT, and LEFT
    // after assessing which arrow key was pressed i add or take away margin from
    // either the top or left to move the snake accordingly
    let snakeXCoord = $('#snake').css('margin-left');
    let snakeYCoord = $('#snake').css('margin-top');
    let foodY = $('#food').css('marginTop');
    let foodX = $('#food').css('marginLeft');
    let sX = parseInt(snakeXCoord.match(/\d+/));
    let sY = parseInt(snakeYCoord.match(/\d+/));
    let fX = parseInt(foodX.match(/\d+/));
    let fY = parseInt(foodY.match(/\d+/));

    // snake moves right
    if (event.which === 39) {
      // setting right side boundary
      if ($('#snake').css('margin-left') == '385px') {
        if (
          // you'll see this logic repeated, should be re-examined for DRY purposes
          // this keeps track of the snakes position in relation to the food item
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          // here we reset the food item after eaten
          createFood();
        }
        $('#snake').css('margin-left', '385px');
      } else {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
          createBody();
          // $('#snake').css('height', '+=5px').css('width', '+=5px');
          // createSnakeTail();
        }
        // snake moves right as long as it doesn't hit boundary
        $('#snake').css('margin-left', '+=5px');
        console.log($('#snake'));
      }
      // end right movement logic

      // snake moves left
      // top block sets game area boundary
    } else if (event.which === 37) {
      if ($('#snake').css('margin-left') == '5px') {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        $('#snake').css('margin-left', '5px');
      } else {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        $('#snake').css('margin-left', '-=5px');
      }
      // end left movement logic
    } else if (event.which === 40) {
      // snake moves up logic
      // setting bottom boundary to stop snake from moving
      if ($('#snake').css('margin-top') == '385px') {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        $('#snake').css('marmgin-top', '385px');
        // console.log('Y-Coord: ', snakeYCoord);
      } else {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        $('#snake').css('margin-top', '+=5px');
      }
    } else if (event.which === 38) {
      // setting top boundary
      if ($('#snake').css('margin-top') == '5px') {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        $('snake').css('margin-top', '5px');
      } else {
        if (
          sX <= fX + 15 &&
          sX >= fX - 15 &&
          sY <= fY + 15 &&
          sY >= fY - 15
        ) {
          createFood();
        }
        // snake moves up
        $('#snake').css('margin-top', '-=5px');
      }
    }
  }

  let food = new createFood();
  let snake = new createSnake();
  $('html').keydown(enableFastFeedback);
});
