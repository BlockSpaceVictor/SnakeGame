export default class InputHandler {
  
  constructor(head, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          head.moveLeft();
          break;

        case 39:
          head.moveRight();
          break;

        case 38:
          head.moveUp();
          break;

        case 40:
          head.moveDown();
          break;

        default:
      }
    });
  }
}
