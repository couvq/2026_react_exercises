import { useContext } from "react";
import { KanbanContext, KanbanDispatchContext } from "./KanbanContext";

export const useKanban = () => {
    
    const context = useContext(KanbanContext);
    if (context === null) {
        throw new Error("useKanban must be used within a KanbanProvider");
    }
    return context;
}

export const useKanbanDispatch = () => {
    const context = useContext(KanbanDispatchContext);
    if (context === null) {
        throw new Error("useKanbanDispatch must be used within a KanbanProvider");
    }
    return context;
}   