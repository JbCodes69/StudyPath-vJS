window.addEventListener('DOMContentLoaded', (e) => {
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', '<link rel="stylesheet"href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />')
})

const appBar = document.getElementById('app-bar')
const activeLink = window.location.pathname.split('/').at(-1)
const navlinks = [
    {
        icon: 'pie_chart',
        title: 'Overview',
        url: 'dashboard.html'
    }, {
        icon: 'folder_open',
        title: 'Courses',
        url: 'courses.html'
    }, {
        icon: 'event_available',
        title: 'Timetable',
        url: 'timetable.html'
    }, {
        icon: 'table_eye',
        title: 'Track',
        url: 'track.html'
    }
]



appBar.setAttribute('class', 'bg-black sticky top-0 z-10')
appBar.innerHTML = `<div class="flex items-center justify-between p-5 border-b shadow-sm">
            <!-- logo -->
            <div class="logo flex items-center">

                <div id="menu-box" class="relative overflow-visible mt-2 items-center">
                    <button id="burger-menu" class="hidden max-md:block  text-gray-400 mr-3 text-lg">
                        <span class="material-symbols-rounded">Menu</span>
                    </button>

                    <div class="burger-menu-list hidden w-80 px-10 absolute shadow-lg border-2 bg-white -bottom-[20px] z-10 p-3 rounded-md">
                        ${navlinks.map((item) =>
    `<a href="${item.url}" class="navlink ${item.url == activeLink ? 'text-red-600' : 'text-gray-400'} flex items-center hover:text-red-600 py-1">
                                                <span class="icon material-symbols-rounded">
                                                    ${item.icon}
                                                </span>
                                                <span class="ml-2 text-[15px]">${item.title} </span>
                                            </a>`
).join('')
    }
                    </div>
                </div>

                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-9 w-10 bg-red-600 text-white rounded">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <h1 class="font-bold uppercase ml-3">
                    <a href="/src/StudyPath.html" class="text-red-600 sm:text-red-600">Study Path</a>
                </h1>
            </div>

            <!-- navlinks -->
            <div class="navlinks w-[70%] h-full flex items-center max-md:hidden justify-evenly" id="menu">
                ${navlinks.map((item) =>
        `<a href="${item.url}" class="navlink ${item.url == activeLink ? 'text-red-600' : 'text-gray-400'} flex items-center hover:text-red-600">
                                        <span class="icon material-symbols-rounded">
                                            ${item.icon}
                                        </span>
                                        <span class="ml-2 text-lg">${item.title} </span>
                                    </a>`
    ).join('')
    }
            </div>


            <!-- appends -->
            <div class="d-flex">

                <a href="#" class="mr-2 text-gray-300">
                    <span class="icon material-symbols-rounded">
                        account_circle
                    </span>
                </a>
                <a href="/src/StudyPath.html" class="mr-2 text-red-600">
                    <span class="icon material-symbols-rounded">
                        logout
                    </span>
                </a>

            </div>
        </div>`


const burgermenu = document.getElementById('burger-menu')


burgermenu.addEventListener('click', (e) => {

    let menuList = e.target.parentElement.parentElement.getElementsByClassName('burger-menu-list')[0]

    if (menuList.classList.contains('hidden')) {
        menuList.classList.replace('hidden', 'block')
    } else {
        menuList.classList.add('hidden')
    }
})


var courses = []
var schedules = []
var tracks = []
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


function loadTracks() {
    let CD = days[new Date().getDay()];

    schedules.forEach((sch) => {
        if (sch.day == CD && !tracks.find((item) => item.schedule_id == sch.id)) {

            let track = {
                // tracj_id should the lenght of the tranks plus 1
                track_id: tracks.length + 1,
                schedule_id: sch.id,
                start_time: null,
                end_time: null,
                status: 'pending',
                name: courses.name
            }
            tracks.unshift(track)
        }

    })

    localStorage.setItem('tracks', JSON.stringify(tracks))
}

function getCourseById(course_id) {
    return courses.find((item) => item.id == course_id)
}

function getScheduleById(schedule_id) {
    return schedules.find((item) => item.id == schedule_id)
}


function loadAllDataFromMemory() {
    schedules = JSON.parse(localStorage.getItem('schedules') ? localStorage.getItem('tracks') : '[]')
    courses = JSON.parse(localStorage.getItem('courses') ? localStorage.getItem('courses') : '[]')
    tracks = JSON.parse(localStorage.getItem('tracks') ? localStorage.getItem('tracks') : '[]')
}

loadAllDataFromMemory()
loadTracks()