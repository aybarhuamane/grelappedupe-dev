import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const customIcons = {
  moveToAvailable: <ChevronLeft size={16} className="text-gray-600" />,
  moveAllToAvailable: <ChevronsLeft size={16} className="text-gray-600" />,
  moveToSelected: <ChevronRight size={16} className="text-gray-600" />,
  moveAllToSelected: <ChevronsRight size={16} className="text-gray-600" />,
  moveDown: <ChevronDown size={16} className="text-gray-600" />,
  moveUp: <ChevronUp size={16} className="text-gray-600" />,
  moveTop: <ChevronsUp size={16} className="text-gray-600" />,
  moveBottom: <ChevronsDown size={16} className="text-gray-600" />,
};

export const lang = {
  availableHeader: "Disponibles",
  selectedHeader: "Seleccionados",
  noAvailableOptions: "No hay roles disponibles",
  noSelectedOptions: "No hay roles seleccionados",
  availableFilterPlaceholder: "Buscar por nombre...",
  selectedFilterPlaceholder: "Buscar por nombre...",
};
