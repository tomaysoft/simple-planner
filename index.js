"use strict";
class Scheduler {
    constructor() {
        this.meetings = [];
    }
    defineNewPerson(name, email) {
        return { personName: name, personEmail: email };
    }
    defineNewMeeting(participants, startTime) {
        if (!this.isHourMark(startTime)) {
            return "Error - Meeting can only start at the hour mark.";
        }
        if (participants.length === 0) {
            return "Error - Participants list is empty.";
        }
        const meeting = { meetingParticipants: participants, meetingStartTime: startTime };
        this.meetings.push(meeting);
        return meeting;
    }
    listPlannedMeetingsForUser(person) {
        return this.meetings.filter((meeting) => meeting.meetingParticipants.some((participant) => participant.personEmail === person.personEmail));
    }
    checkAvailableTimeSlotsForUsers(participants) {
        const scheduledBusyTimeSlots = this.meetings.map((meeting) => meeting.meetingStartTime);
        const availableSlots = [];
        // working hours are from 8 AM to 6 PM
        for (let hour = 8; hour < 18; hour++) {
            const potentialSlot = new Date('2024-03-05');
            potentialSlot.setHours(hour, 0, 0, 0);
            if (!scheduledBusyTimeSlots.some((busySlot) => busySlot.getTime() === potentialSlot.getTime())) {
                availableSlots.push(new Date(potentialSlot));
            }
        }
        return availableSlots;
    }
    isHourMark(date) {
        return date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0;
    }
}
var scheduleDate = new Date('2024-03-05');
const scheduler = new Scheduler();
const userJohn = scheduler.defineNewPerson("John Smith", "john@email.address.com");
const userJane = scheduler.defineNewPerson("Jane Brown", "jane@domain.com");
const meeting1Time = new Date(scheduleDate.setHours(10, 0, 0, 0));
const meeting1 = scheduler.defineNewMeeting([userJohn, userJane], meeting1Time);
console.log('meeting set correctly', meeting1);
const meeting2Time = new Date(scheduleDate.setHours(13, 0, 0, 0));
const meeting2 = scheduler.defineNewMeeting([userJohn, userJane], meeting2Time);
console.log('another meeting set correctly', meeting2);
const meeting3Time = new Date(scheduleDate.setHours(14, 0, 0, 0));
const meeting3 = scheduler.defineNewMeeting([userJohn], meeting3Time);
console.log('meeting with 1 participant', meeting3);
const meeting4Time = new Date(scheduleDate.setHours(11, 30, 0, 0));
const meeting4 = scheduler.defineNewMeeting([userJohn], meeting4Time);
console.log('meeting not in hour mark', meeting4);
const meeting5Time = new Date(scheduleDate.setHours(15, 0, 0, 0));
const meeting5 = scheduler.defineNewMeeting([], meeting5Time);
console.log('meeting with no participants', meeting5);
const johnsSchedule = scheduler.listPlannedMeetingsForUser(userJohn);
console.log('schedule for John', johnsSchedule);
const janesSchedule = scheduler.listPlannedMeetingsForUser(userJane);
console.log('schedule for Jane', janesSchedule);
const availableSlots = scheduler.checkAvailableTimeSlotsForUsers([userJohn, userJane]);
console.log('available time slots', availableSlots);
