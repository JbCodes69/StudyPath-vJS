const infoCards = document.getElementById("info-cards")

const infoDetails = [
    {
        heading: "Monitor Your Progress",
        body: "Keep an eye on how much time you spend learning and the topics you cover"
    }, {
        heading: "Set Goals",
        body: "Define your learning objectives and track your achievements."
    }, {
        heading: "Analyze Patterns",
        body: "Gain insights into your learning habits and identify areas for improvement."
    }, {
        heading: "Stay Motivated",
        body: "Visualize your progress and celebrate milestones"
    }
]


// code for info details
infoDetails.forEach((item) => {
    infoCards.insertAdjacentHTML('beforeend',
        `<div class="card flex flex-col py-2 px-3 max-sm:col-span-4 max-md:col-span-2 items-center justify-center">
                    <h3 class="font-semibold text-lg text-gray-700 text-center leading-5">${item.heading}</h3>
                    <p class="text-gray-600 text-sm text-center mt-1">
                        ${item.body}
                    </p>
                </div>`
    )
})


