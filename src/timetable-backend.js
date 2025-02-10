var schedules = []
var courses = []
var scheduleTb = document.getElementsByClassName("Timetable")




// load courses into the form
function loadCoursesIntoForm() {
    courses.forEach((course) => {
        document.getElementById('courseSelect')
            .insertAdjacentHTML('beforeend', `
                <option value="${course.id}">${course.name}</option>
            `)
    })
}


document.getElementById('newScheduleForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let courseSelect = e.target.elements['courses'].value
    let day = e.target.elements['day'].value
    let stime = e.target.elements['start-time'].value
    let stMinutes = e.target.elements['st-minutes'].value
    let etime = e.target.elements['end-time'].value
    let endMinutes = e.target.elements['end-minutes'].value


    if (!courseSelect || !day || !stime || !etime) {
        return alert("Please Select All Fields")
    }

    if ((stime && stMinutes == 0) && (parseInt(etime) < parseInt(stime))) {
        return alert("Invalid ending time")
    } else if (stime == etime && endMinutes <= stMinutes) {
        return alert("Invalid end Minutes") 
    }


    // get a schedule by the selected day
    schedules.forEach((sch) => {
        if (sch.day == day) {
            if (sch.etime && sch.endMinutes == 0 && stime < sch.etime) {
                return alert("Existing Schedule")
            } else if (sch.etime && sch.endMinutes && stime >= sch.etime && stMinutes < sch.endMinutes) {
                return alert("Invalid End Minutes")
            }
        }
    })

    let schedule = {
        id: schedules.length + 1,
        created_at: new Date().toUTCString(),
        course_id: courseSelect,
        day: day,
        stime,
        etime,
        stMinutes,
        endMinutes
    }

    schedules.unshift(schedule)

    loadSchedules()
    loadTracks()
    loadAllDataIntoMemory()

    e.target.reset()
    e.target.getElementsByClassName("close-btn")[0].click()
})

function loadAllDataIntoMemory() {
    localStorage.setItem('schedules', JSON.stringify(schedules))
    loadSchedules()
}

function loadAllDataFromMemory() {
    schedules = JSON.parse(localStorage.getItem('schedules') ?? '[]')
    courses = JSON.parse(localStorage.getItem('courses') ?? '[]')
}

function loadSchedules() {
    var timetable = new Timetable();
    timetable.setScope(0, 23); // optional, only whole hours between 0 and 23
    timetable.useTwelveHour(); //optional, displays hours in 12 hour format (1:00PM)
    timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

    schedules.forEach((sch) => {
        let options = {
            data: {
                id: sch.id
            },
            onClick: function (event, timetable, clickEvent) {
                let confirmation = confirm(`Are You Sure You Want To Delete This schedule`)
                if(confirmation){
                    schedules = schedules.filter((item) => item.id != sch.id)
                    tracks = tracks.filter((item) => item.schedule_id != sch.id)
                    localStorage.setItem('tracks', tracks)
                    loadAllDataIntoMemory();
                }

            } // custom click handler, which is passed the event object and full timetable as context  
        };
        timetable.addEvent(
            courses.find((item) => item.id == sch.course_id)['name'], sch.day,
            new Date(0, 0, 0, sch.stime, sch.stMinutes),
            new Date(0, 0, 0, sch.etime, sch.endMinutes), options
        )
    })

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable'); // any css selector
}

loadAllDataFromMemory()
loadCoursesIntoForm()
loadSchedules()