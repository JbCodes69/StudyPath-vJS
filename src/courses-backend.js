var courses = []
var coursesTb = document.getElementById("coursesTb")

const openCourseDialogbtn = document.getElementById("openCourseDialog")
const openCourseDialog = document.getElementById("courseDialog")

openCourseDialogbtn.addEventListener('click', () => {
    openCourseDialog.classList.replace('hidden', 'flex')
    let clton = openCourseDialog.getElementsByClassName('close-btn')
    let dialogCard = openCourseDialog.getElementsByClassName('dialogCard')
    clton[0].addEventListener('click', () => {
        // make card slide up on close
        openCourseDialog.classList.replace('flex', 'hidden')        
    })
})

// add course event
document.getElementById('newCourseForm')?.addEventListener('submit', (e) => {
    e.preventDefault()

    let courseName = e.target.elements['course']

    // check is its empty
    if (!courseName.value) {
        return alert("Please enter a valid course name")
    }

    // check if exists
    if (courses.find((item) => item.name == courseName.value)) {
        return alert(`The course ${courseName.value} is already registed`)
    }

    let course = {
        id: courses.length + 1,
        created_at: new Date().toUTCString(),
        name: courseName.value.trim()
    }
    courses.unshift(course)
    courseName.value = ""
    loadCourses()
    loadAllDataIntoMemory()

    e.target.getElementsByClassName("close-btn")[0].click()
})

// edit course
function editCourse(courseId){
    let edited = prompt('Edit your course name', courses.find((item) => item.id == courseId)['name'])
    if(edited){
        let _course = courses.find((item) => item.name == edited) 
        if (_course && _course.id != courseId) {
            alert(`The course ${edited} is already registed`)
        }else{
            courses = courses.map((item) => {
                if(item.id == courseId){
                    item.name = edited
                }
                return item
            })
            loadAllDataIntoMemory()
        }
    }
}

// delete course
function deleteCourse (courseId){
    let Deleted = courses.find((item) => item.id == courseId);
    if(Deleted){
        let confirmation = confirm(`Are you sure you want to delete the course: ${Deleted.name}?`);
        if(confirmation){
            courses = courses.filter((item) => item.id != courseId);
            loadAllDataIntoMemory();
        }else{
            alert('Course not found');
        }
    }
}

// loadAllDataIntoMemory
function loadAllDataIntoMemory(){
    localStorage.setItem('courses', JSON.stringify(courses))
    loadCourses()
}

// loadAllDataFromMemory
function loadAllDataFromMemory(){
    courses = JSON.parse(localStorage.getItem('courses') ?? '[]')
}

// load courses
function loadCourses() {
    coursesTb.innerHTML = ""
    courses.forEach((item, index) => {
        coursesTb.insertAdjacentHTML('beforeend', `
            <tr class="border-b">
                    <td class="text-left p-2">${index + 1}</td>
                    <td class="text-center">${item.name}</td>
                    <td class="text-center">${item.created_at}</td>
                    <td class="text-center">
                        <div class="py-1">
                            <button onClick="editCourse(${item.id})" class="text-xs px-2 py-1 bg-yellow-300 rounded-md">
                                <span class="material-symbols-rounded">
                                    edit
                                </span>
                            </button>
                            <button onClick="deleteCourse(${item.id})" class="text-xs px-2 py-1 bg-red-600 text-white rounded-md">
                                <span class="material-symbols-rounded">
                                    delete
                                </span>
                            </button>
                        </div>
                    </td>
                </tr>
        `)
    })
}

// load functions
loadAllDataFromMemory()
loadCourses()


/** 
 * TODO: Homework
 * 1. Implement delete operation for a course------Done
 * 2. New courses should be at the top of the array------Done
 * 3. Change file name to course-backend.js-------DONE
 * 4. Create another backend file called timetable-backend.js------Done
 * 5. implement the add new schedule function to save schedule into an array
*/
