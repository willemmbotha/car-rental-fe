import { CustomerResponse } from "./customer.interface";
import { VehicleResponse } from "./vehicle.interface";

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

export interface RentalSearchResponse {
  id: number;
  customer: CustomerResponse;
  vehicle: VehicleResponse;
  startDate: string;
  endDate: string;
  rentalStatus: string;
}
