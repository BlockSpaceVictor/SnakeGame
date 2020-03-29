export function detectCollision(head, gameObject) {
  //check collision with food
  let bottomOfhead = head.position.y + head.height;
  let topOfhead = head.position.y;
  let leftSidehead = head.position.x;
  let rightSideOfhead = head.position.x + head.width;

  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    ((topOfObject >= topOfhead && topOfObject <= bottomOfhead) ||
    (bottomOfObject >= topOfhead && bottomOfObject <= bottomOfhead)) &&
    ((leftSideOfObject <= leftSidehead && rightSideOfObject >= leftSidehead) ||
      (leftSideOfObject >= leftSidehead && rightSideOfObject <= rightSideOfhead) ||
      (leftSideOfObject >= leftSidehead && leftSideOfObject <= rightSideOfhead))
    ) {
    return true;
  } else {
    return false;
  }
}


// (bottomOfhead >= topOfObject &&
//     topOfhead <= bottomOfObject &&
//     (rightSideOfhead >= leftSideOfObject &&
//       leftSidehead <= rightSideOfObject) &&
//     (topOfObject >= topOfhead && topOfObject <= bottomOfhead) ||
//     (bottomOfObject >= topOfhead && bottomOfObject <= bottomOfhead)) ||
    
//     ((rightSideOfhead >= leftSideOfObject &&
//       leftSidehead <= rightSideOfObject) &&
//     (topOfObject >= topOfhead && topOfObject <= bottomOfhead) ||
//     (bottomOfObject >= topOfhead && bottomOfObject <= bottomOfhead)) ||

//     ((leftSidehead <= rightSideOfObject &&
//       rightSideOfhead >= leftSideOfObject) &&
//       (topOfObject >= topOfhead && topOfObject <= bottomOfhead) ||
//     (bottomOfObject >= topOfhead && bottomOfObject <= bottomOfhead))