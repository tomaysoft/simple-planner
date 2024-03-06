interface Person {
    personName: string;
    personEmail: string;
}

interface Meeting {
    meetingParticipants: Person[];
    meetingStartTime: Date;
}

class Scheduler {
    meetings: Meeting[] = [];

    defineNewPerson(name: string, email: string): Person {
        return { personName: name, personEmail: email };
    }

    defineNewMeeting(participants: Person[], startTime: Date): Meeting | string {
        if (!this.isHourMark(startTime)) {
            return "Error - Meeting can only start at the hour mark.";
        }
        if (participants.length === 0) {
            return "Error - Participants list is empty.";
        }
        const scheduledBusyTimeSlots = this.meetings.map((meeting) => meeting.meetingStartTime);
        if (this.meetings.filter((meeting) => meeting.meetingStartTime.getTime() === startTime.getTime()).length > 0) {
            return "Error - this timeslot is already busy.";
        }

        const meeting: Meeting = { meetingParticipants: participants, meetingStartTime: startTime };
        this.meetings.push(meeting);

        return meeting;
    }

    listPlannedMeetingsForUser(person: Person): Meeting[] {
        return this.meetings.filter((meeting) =>
            meeting.meetingParticipants.some((participant) => participant.personEmail === person.personEmail)
        );
    }

    checkAvailableTimeSlotsForUsers(participants: Person[], dateToCheck: Date): Date[] {
        const scheduledBusyTimeSlots = this.meetings.map((meeting) => meeting.meetingStartTime);
        const availableSlots: Date[] = [];

        // working hours are from 8 AM to 6 PM
        for (let hour = 8; hour < 18; hour++) {
            const potentialSlot = dateToCheck;
            potentialSlot.setHours(hour, 0, 0, 0);

            if (!scheduledBusyTimeSlots.some((busySlot) => busySlot.getTime() === potentialSlot.getTime())) {
                availableSlots.push(new Date(potentialSlot));
            }
        }

        return availableSlots;
    }

    private isHourMark(date: Date): boolean {
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

const meeting2Time = new Date(scheduleDate.setHours(13, 0, 0, 0))
const meeting2 = scheduler.defineNewMeeting([userJohn, userJane], meeting2Time);
console.log('another meeting set correctly', meeting2);

const meeting3Time = new Date(scheduleDate.setHours(14, 0, 0, 0))
const meeting3 = scheduler.defineNewMeeting([userJohn], meeting3Time);
console.log('meeting with 1 participant', meeting3);

const meeting4Time = new Date(scheduleDate.setHours(11, 30, 0, 0))
const meeting4 = scheduler.defineNewMeeting([userJohn], meeting4Time);
console.log('meeting not in hour mark', meeting4);

const meeting5Time = new Date(scheduleDate.setHours(15, 0, 0, 0))
const meeting5 = scheduler.defineNewMeeting([], meeting5Time);
console.log('meeting with no participants', meeting5);

const meeting6Time = new Date(scheduleDate.setHours(14, 0, 0, 0))
const meeting6 = scheduler.defineNewMeeting([userJohn, userJane], meeting6Time);
console.log('meeting on busy time', meeting6);

const johnsSchedule = scheduler.listPlannedMeetingsForUser(userJohn);
console.log('schedule for John', johnsSchedule);

const janesSchedule = scheduler.listPlannedMeetingsForUser(userJane);
console.log('schedule for Jane', janesSchedule);

const availableSlots = scheduler.checkAvailableTimeSlotsForUsers([userJohn, userJane], scheduleDate);
console.log('available time slots', availableSlots);
