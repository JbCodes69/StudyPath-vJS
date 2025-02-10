var courses = []
var schedules = []
var tracksTb = document.getElementById("tracksTb")
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getCourseById(course_id) {
    return courses.find((item) => item.id == course_id)
}

function getScheduleById(schedule_id) {
    return schedules.find((item) => item.id == schedule_id)
}

function getTrackById(track_id) {
    return tracks.find((item) => item.id == track_id)
}

function loadScheduelesIntoTracks() {
    tracksTb.innerHTML = ""
    tracks.forEach((item) => {
        let schedule = getScheduleById(item.schedule_id)
        let course = getCourseById(schedule.course_id)

        st = `${(schedule.stime) > 12 ? schedule.stime % 12 : schedule.stime} : ${schedule.stMinutes == 0 ? '00' : schedule.stime} ${schedule.stime > 11 ? 'pm' : 'am'}`
        et = `${(schedule.etime) > 12 ? schedule.etime % 12 : schedule.etime} : ${schedule.endMinutes == 0 ? '00' : schedule.endMinutes} ${schedule.etime > 11 ? 'pm' : 'am'}`

        active_sch = schedule.stime <= new Date().getHours() && schedule.etime > new Date().getHours()

        delayed_hrs = `${item.start_time ? (new Date().getHours(item.start_time) - schedule.stime) + 'hrs' : '00'}`
        delayed_min = `${item.start_time ? (new Date().getMinutes(item.start_time) - schedule.stMinutes) + 'min' : '00'}`

        tracksTb.insertAdjacentHTML('beforeend', `<tr class="border-b ${!active_sch ? 'text-gray-400': ''}">
                    <td class="text-left p-2" >${course.name} </td>
                    <td class="text-center" >${st}</td>
                    <td class="text-center" >${delayed_hrs}:${delayed_min}</td>
                    <td class="text-center" >${et}</td>
                    <td class="text-center" >
                        <button type="button" ${!active_sch || item.end_time ? 'disabled' : ''} class="dialogbtn border px-1" onclick="openTrackDialog(${item.id})" >${item.status.toUpperCase()}</button></td>
                </tr>`)
    })
}

let dialogbtn = document.getElementsByClassName('dialogbtn')
let trackDialog = document.getElementById("trackDialog")

function openTrackDialog(track_id) {
    const closeDialog = () => {
        loadAllDataIntoMemory()
        loadScheduelesIntoTracks()
        trackDialog.classList.replace('flex', 'hidden')
    }
    let track = getTrackById(track_id)

    trackDialog.classList.replace('hidden', 'flex')
    let xbtn = trackDialog.getElementsByClassName('xbtn')[0]
    xbtn.addEventListener('click', () => {
        trackDialog.classList.replace('flex', 'hidden')
    })

    let startbtn = trackDialog.getElementsByClassName('startbtn')[0]
    if (track.start_time){
        startbtn.disabled = true
    }

    startbtn.addEventListener('click', () => {
        tracks = tracks.map((item) => {
            if(item.id == track_id){
                item.start_time = new Date()
                item.status = 'active'
            }
            return item
        })
        
        closeDialog()
    })

    
    let endbtn = trackDialog.getElementsByClassName('endbtn')[0]
    if (track.end_time){
        endbtn.disabled = true
    }
    endbtn.addEventListener('click', () => {
        tracks = tracks.map((item) => {
            if(item.id == track_id && item.start_time){
                item.end_time = new Date()
                item.status = 'completed'
                alert('You have Completed') 
            }
            return item
        }) 

        closeDialog()
    }) 
}


function loadAllDataIntoMemory() {
    localStorage.setItem('tracks', JSON.stringify(tracks))
}

function loadAllDataFromMemory() {
    schedules = JSON.parse(localStorage.getItem('schedules') ?? '[]')
    courses = JSON.parse(localStorage.getItem('courses') ?? '[]')
    tracks = JSON.parse(localStorage.getItem('tracks') ?? '[]')
}

loadAllDataFromMemory()
loadScheduelesIntoTracks()
loadTracks()