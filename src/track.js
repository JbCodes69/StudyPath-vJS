const Statusbtn = document.getElementById("Statusbtn")
const trackDialog = document.getElementById("trackDialog")

Statusbtn.addEventListener('click', () => {
    trackDialog.classList.replace('hidden', 'flex')
    let xbtn = trackDialog.getElementsByClassName('xbtn')
    xbtn[0].addEventListener('click', () => {
        trackDialog.classList.replace('flex', 'hidden')
    })
})
