function isOverlapping(elementRect, otherElementRect) {
    return (
      elementRect.left < otherElementRect.right &&
      elementRect.top < otherElementRect.bottom &&
      elementRect.right > otherElementRect.left &&
      elementRect.bottom > otherElementRect.top
    );
  }
  export {isOverlapping}