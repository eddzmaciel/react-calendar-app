import { addHours } from "date-fns";


export const mockEvents = [
    {
        title: 'Board meeting',
        notes: 'Discuss quarterly results and future strategy',
        start: new Date(),
        end: addHours(new Date(), 2), // Ends at 12:00 PM
        allDay: false,
        bgColor: '#f0f0f0',
        user: {
            _id: '123',
            name: 'John Doe',
            email: 'john.doe@example.com',
        }
    },
    {
        title: 'Team lunch',
        notes: 'Discuss project updates and team building',
        start: new Date(2023, 9, 21, 12, 0, 0),
        end: new Date(2023, 9, 21, 13, 0, 0),
        allDay: false,
        bgColor: '#f0f0f0',
        user: {
            _id: '124',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
        }
    }
]