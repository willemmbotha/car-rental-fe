export interface RentalResponse {
  id: number;
  customerId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  rentalStatus: string;
}

export interface CreateRentalRequest {
  customerId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  rentalStatus: string;
}

export interface PatchRentalRequest {
  id: number;
  customerId?: number;
  vehicleId?: number;
  startDate?: string;
  endDate?: string;
  rentalStatus?: string;
}
