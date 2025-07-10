import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {


    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2), // Ends at 12:00 PM
            allDay: false,
            bgColor: '#f0f0f0',
            user: {
                _id: '123',
                name: 'John Doe',
                email: 'john.doe@example.com',
            }
        }); // Clear any active event
        openDateModal();
    }
    return (
        <button className="btn btn-primary fab" onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
