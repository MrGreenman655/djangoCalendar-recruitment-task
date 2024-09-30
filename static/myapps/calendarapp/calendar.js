class EventCalendar {
    constructor() {
        this.today = new Date();
        this.choosenMonth = this.today.getMonth()
        this.choosenYear = this.today.getFullYear();
        this.addEventListeners()
        this.generateNav()
        this.generateCalendar()
    }

    generateNav() {
        $('.cal-navbar').html(
            `
            <div class="col mx-1">
                <div class="cal-navbar__middle">
                    <i class="fa-solid fa-angle-left month-navigation" id="previousMonthButton"></i>
                    <i class="fa-solid fa-angle-right month-navigation" id="nextMonthButton"></i>
                    <span class="cal-navbar__middle__month" id="monthName">${months[this.choosenMonth]}</span>
                    
                    <span class="custom-color-primary" id="year">${this.choosenYear}</span>
                </div>
            </div>
            `
        )
    }

    generateCalendar() {
        let events = {}
        $.ajax({
            url: '/calendar-app/api/events/',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: (data) => {
                events = groupEventsByDay(data)
            },
        });
        $('.cal-calendar').empty()
        $('.cal-calendar').append(
            `
                <div class="cal-calendar__weekday-container">
                    
                </div>
            `
        )
        for (let i = 0; i < 7; i++) {
            $('.cal-calendar__weekday-container').append(
                `<div class="weekday-container__day">${weekDayNames[i]}</div>`
            )
        }
        $('.cal-calendar').append(
            `
                <div class="cal-calendar__days-container">
                    
                </div>
            `
        )
        const calendarDays = generateCalendarDays(this.choosenMonth + 1, this.choosenYear);
        calendarDays.forEach((item) => {
            const yearNumberStr = item.yearNumber
            const monthNumberStr = item.monthNumber < 10 ? `0${item.monthNumber}` : `${item.monthNumber}`
            const dayNumberStr = item.dayNumber < 10 ? `0${item.dayNumber}` : `${item.dayNumber}`
            const eventKey = `${yearNumberStr}-${monthNumberStr}-${dayNumberStr}`
            const blankObject = $(`<div></div>`)
            if (Object.hasOwn(events, eventKey)) {
                const choosenEvents = events[eventKey]
                choosenEvents.forEach((item) => {
                    blankObject.append(
                        `
                        <div class="event" data-id="${item.id}">
                            <i class="fa-solid fa-circle event__icon"></i>
                            <span class="event__name">
                                ${item.start_hour}-${item.end_hour}
                                ${item.name}                                
                            </span>
                        </div>
                        `
                    )
                })
            }
            $('.cal-calendar__days-container').append(
                `
                <div class="days-container__day" style="height: calc(${100}%/${calendarDays.length / 7})">
                    <span class="${item.currentMonth ? 'day__number' : 'day__number--not-current-month'}">${item.dayNumber}</span> 
                    <div class="day__events-container"">
                         ${blankObject.html()}
                    </div>      
                </div>
                `
            )
        })
    }

    getNextMonth() {
        if (this.choosenMonth === 11) {
            this.choosenMonth = 0
            this.choosenYear += 1
        } else {
            this.choosenMonth += 1
        }
        this.generateNav()
        this.generateCalendar()
    }

    getPreviousMonth() {
        if (this.choosenMonth === 0) {
            this.choosenMonth = 11
            this.choosenYear -= 1
        } else {
            this.choosenMonth -= 1
        }
        this.generateNav()
        this.generateCalendar()
    }

    addEventListeners() {
        const myModal = new bootstrap.Modal($('#exampleModal'))
        // Next month
        $(document).on('click', '#nextMonthButton', () => {
            this.getNextMonth()
        })
        $(document).on('click', '#previousMonthButton', () => {
            this.getPreviousMonth()
        })
        $(document).on('click', '.event', (e) => {
            const eObj = $(e.currentTarget)
            let modalData={}
            $.ajax({
                url: `/calendar-app/api/event/${eObj.data('id')}/`,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: (data) => {
                    modalData = data
                },
            });

            $('#modalLabel').html(modalData.name)
            $('#location').html(modalData.location)
            $('#duration').html(modalData.duration)

            const startDate = new Date(modalData.start_time);
            const startHour = startDate.toTimeString().slice(0, 5);
            const endDate = new Date(startDate.getTime() + modalData.duration * 60 * 60 * 1000);
            const endHour = endDate.toTimeString().slice(0, 5);

            $('#startTime').html(startHour)
            $('#endTime').html(endHour)
            $('#registrationLink').html(`<a class="custom-color-primary" href=${modalData.registration_link}>link</a>`)
            $('#shortDescription').html(modalData.short_description)
            $('#tags').html(modalData.tags.map(item => item.name).join(', '))
            $('#longDescription').html(modalData.long_description)
            myModal.show()
        })
    }
}

$(() => {
    const calendar = new EventCalendar()
})

const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];
const weekDayNames = ['PON.', 'WT.', 'ŚR.', 'CZW.', 'PT.', 'SOB.', 'NIEDZ.']

const generateCalendarDays = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month - 1, daysInMonth).getDay();

    const prevMonthDays = [];
    const nextMonthDays = [];
    const currentMonthDays = [];

    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    for (let i = 0; i < daysFromPrevMonth; i++) {
        prevMonthDays.push({
            yearNumber: month - 1 < 1 ? year - 1 : year,
            dayNumber: daysInPrevMonth - daysFromPrevMonth + i + 1,
            monthNumber: month - 1 < 1 ? 12 : month - 1,
            events: [],
            currentMonth: false
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        currentMonthDays.push({
            yearNumber: year,
            dayNumber: i,
            monthNumber: month,
            events: [],
            currentMonth: true,
        });
    }

    const daysToAddFromNextMonth = lastDay === 0 ? 0 : 7 - lastDay;

    for (let i = 1; i <= daysToAddFromNextMonth; i++) {
        nextMonthDays.push({
            yearNumber: month >= 12 ? year + 1 : year,
            dayNumber: i,
            monthNumber: month + 1 > 12 ? 1 : month + 1,
            events: [],
            currentMonth: false,
        });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}
const groupEventsByDay = (events) => {
    return events.reduce((acc, event) => {
        const day = event.start_time.slice(0, 10);
        const startDate = new Date(event.start_time);
        const startHour = startDate.toTimeString().slice(0, 5);
        const endDate = new Date(startDate.getTime() + event.duration * 60 * 60 * 1000);
        const endHour = endDate.toTimeString().slice(0, 5);

        const eventWithHours = {
            ...event,
            start_hour: startHour,
            end_hour: endHour
        };

        if (!acc[day]) {
            acc[day] = [];
        }

        acc[day].push(eventWithHours);
        acc[day].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

        return acc;
    }, {});
};



