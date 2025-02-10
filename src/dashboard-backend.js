var courses = []
const totalcourses = courses.length


function loadCoursesIntoDashboard(){
    document.getElementById('noCourses').getElementsByClassName('value')[0].innerHTML = courses.length
    document.getElementById('noTasks').getElementsByClassName('value')[0].innerHTML = tracks.length
    document.getElementById('noComTasks').getElementsByClassName('value')[0].innerHTML = tracks.filter((item) => item.end_time).length

    let noHrs = 0
    
    tracks.filter((item) => item.end_time).forEach((item) => {
        noHrs = noHrs + (new Date(item.end_time).getTime() - new Date(item.start_time).getTime())/3600000
    })

    document.getElementById('noHrs').getElementsByClassName('value')[0].innerHTML = Math.round(noHrs * 100)/100

}

// document.addEventListener('DOMContentLoaded', (e) => {
//     e.preventDefault
// })  

function loadAllDataFromMemory() {
    courses = JSON.parse(localStorage.getItem('courses') ?? '[]')
}

loadAllDataFromMemory()
loadCoursesIntoDashboard()
