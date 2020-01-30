function displayListeUniquesErrors(){
    document.getElementById("overlay").style.display = 'block'
    document.getElementsByTagName("body")[0].style.overflow = 'hidden'
    window.scroll(0, 0)
}

function hideOverlay(){
    document.getElementById("overlay-container").scroll(0, 0)
    document.getElementById("overlay").style.display = 'none'
    document.getElementsByTagName("body")[0].style.overflow = 'visible'
}