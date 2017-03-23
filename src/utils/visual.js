export const rippleEffect = (event) => {
  event.preventDefault();
  //== 1 - setup

  //console.log(event.target.classList.contains('calculator-keypad-key'));
  const target = event.target,
        posX = event.target.offsetLeft,
        posY = event.target.offsetTop,
        posXMain = document.getElementById('nav-menu-buttons').offsetLeft,
        posYMain = document.getElementById('nav-menu-buttons').offsetTop;
  let buttonWidth = event.target.offsetWidth,
      buttonHeight = event.target.offsetHeight;
  // 2 - remove any old ripple element
  //event.target.remove();
  // // 3 - add new ripple element
  // let newRipple = document.createElement('span');
  // newRipple.classList.add('ripple');
  // event.target.appendChild(newRipple);
  // // 4 - make it round
  // if (buttonWidth >= buttonHeight) {
  //   buttonHeight = buttonWidth;
  // } else {
  //   buttonWidth = buttonHeight;
  // }
  // // 5 - get the center of the element
  // var x = event.clientX - (posX + posXMain) - buttonHeight / 2;
  // var y = event.clientY - posYMain - buttonHeight / 2;
  // // 6 - add ripples CSS and start animation
  // $('.ripple').css({
  //   width: buttonWidth,
  //   height: buttonHeight,
  //   top: y + 'px',
  //   left: x + 'px'
  // }).addClass('rippleEffect');
}
