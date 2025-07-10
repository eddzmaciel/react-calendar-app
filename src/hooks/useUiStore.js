
import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

// creating my custom hooks to manage the reducers
export const useUiStore = () => {
    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector((state) => state.ui);

    const openDateModal = () =>{
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () =>{
        dispatch(onCloseDateModal())
    }

    const toggleDateModal = () => {
        isDateModalOpen ? closeDateModal() : openDateModal();
    }

    return {
        // * propiedades
        isDateModalOpen,
        // * metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}