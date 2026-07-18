import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import "./calendar.css";


const Calendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May",                 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    const currentDate = new Date();

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    // Get How many days in a month and First day of month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1: prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1: prevYear));
    }

    return (
        <div className="calendar-app">
            <div className="calendar">
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <SlArrowLeft className="button-icon" onClick={prevMonth}></SlArrowLeft>
                        <SlArrowRight className="button-icon" onClick={nextMonth}></SlArrowRight>
                    </div>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
                </div>
                <div className="days">
                    {[...Array(firstDayOfMonth).keys()].map((_, index) => <span key={`empty-${index}`}/>)}
                    {[...Array(daysInMonth).keys()].map((day) => 
                        <span 
                            key={day + 1} 
                            className={
                                day + 1 === currentDate.getDate() &&
                                currentMonth === currentDate.getMonth() &&
                                currentYear === currentDate.getFullYear()
                                 ? 'current-day' : ''}>
                            {day + 1}
                        </span>)}
                </div>
            </div>
        </div>
    )
}

export default Calendar;