import { createContext } from "react";
import { AdminContextType } from "../Types/Context";

export const AdminContext = createContext<AdminContextType | null>(null);