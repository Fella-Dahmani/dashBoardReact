import { ReactNode } from "react";

// Alert.ts
export interface Alert {
    dateReglee: ReactNode;
    dateCreee: ReactNode;
    fournisseur: ReactNode;
    gere: boolean | undefined;
    id: number;
    type: string;
    message: string;
    date: string;
  }
  