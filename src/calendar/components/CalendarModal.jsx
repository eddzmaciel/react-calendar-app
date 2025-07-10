import { addHours, set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react'

import Modal from 'react-modal'

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Import Spanish locale for DatePicker
registerLocale('es', es); // Register Spanish locale for DatePicker

import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import { useUiStore,useCalendarStore } from '../../hooks';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// this is from the inde.html file
Modal.setAppElement('#root');

export const CalendarModal = () => {
    // importing our custom methods from the hook
    const {isDateModalOpen,closeDateModal} = useUiStore(); // Assuming you have a custom hook to manage UI state
    const {activeEvent,startSavingEvent} = useCalendarStore(); // Assuming you have a custom hook to manage calendar state


    // const [isOpen, setIsOpen] = useState(true); // State to manage selected event, if needed
    const [formSubmited, setFormSubmitted] = useState(false); // State to manage form submission status

    // usestate for formManagement
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2), // Default end time is 2 hours later
    });


    const { title, notes, start, end } = formValues;

    const titleClass = useMemo(() => {
        if (!formSubmited) return '';
        return title.length > 0 ? ' ' : 'is-invalid';
    }, [title, formSubmited]);


    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    const onCloseModal = () => {
        console.log('Modal closed');
        closeDateModal(); // Close the modal using the reducer
        // isDateModalOpen(false); // Close the modal
        // Here you can add logic to close the modal, e.g., update state
    }

    const onInputChange = ({ target }) => {
        console.log('Input changed:', target.name, target.value);
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const onDateChanges = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submitted:', formValues);
        setFormSubmitted(true); // Set form submission status
        // Here you can add logic to handle form submission, e.g., save the event
        // After saving, you might want to close the modal
        // TODO: 
        // validar fechas
        console.log('Validating dates:',dateDifferences(start, end));
        
        if (dateDifferences(start, end) < 0 ) {
            Swal.fire({
                title: 'Error',
                text: 'La fecha de inicio debe ser anterior a la fecha de fin',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        startSavingEvent(formValues); // Call the method to save the event
        // remover errores en pantalla
        // cerrar modal
        closeDateModal(); 
        // limpiar formulario y quitar los errores
        setFormSubmitted(false);
        // onCloseModal();
    };

    const dateDifferences = (start, end) => {
        return (end - start) / (1000 * 60 * 60); //
    };

    return (
        <Modal
            isOpen={isDateModalOpen} // Change this to a state variable to control modal visibility
            onRequestClose={onCloseModal} // Handle modal close
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200} // Optional: add a timeout for closing animation
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2" >
                    <label>Fecha y hora inicio </label>
                    <DatePicker
                        className={`form-control ${titleClass}`}
                        placeholder="Fecha inicio"
                        locale={'es'} // Set locale to Spanish
                        maxDate={end} // Prevent selecting start date after end date
                        selected={start}
                        onChange={(event) => onDateChanges(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15} // Adjust time intervals as needed
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label> Fecha y hora fin </label>
                    <DatePicker
                        className={`form-control ${titleClass}`}
                        placeholder="Fecha fin"
                        locale={'es'} // Set locale to Spanish
                        minDate={start} // Prevent selecting end date before start date
                        selected={end}
                        onChange={(event) => onDateChanges(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15} // Adjust time intaervals as needed
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
