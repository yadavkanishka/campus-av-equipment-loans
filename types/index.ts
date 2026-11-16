
export type UserRole = "COORDINATOR" | "DEPOT_STAFF";

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "DENIED"
  | "PICKED_UP"
  | "RETURNED";

export interface LoanRequest {
  id: number;
  trackingCode: string;
  requesterName: string;
  requesterEmail: string;
  department: string;
  purpose: string;
  equipmentId: number;
  quantity: number;
  startDate: string;
  endDate: string;
  status: RequestStatus;
  coordinatorNotes: string | null;
  createdAt: string;
}

export interface Equipment {
  id: number;
  name: string;
  description: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
  imageUrl: string | null;
  isActive: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
