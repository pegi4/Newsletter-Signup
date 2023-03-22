function setBodyHeight() {
    const windowHeight = window.innerHeight;
    document.body.style.height = windowHeight + "px";
  }
  
  // Set initial body height on page load
  setBodyHeight();
  
  // Add event listener to update body height on window resize
  window.addEventListener("resize", setBodyHeight);