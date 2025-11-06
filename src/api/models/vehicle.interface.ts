export interface VehicleResponse {
  id: number;
  displayName: string;
  registrationNumber: string;
  year: number;
  make: string;
  model: string;
  mileage: number;
  fuelType: string;
  licenseExpiryDate: string;
  vehicleStatus: string;
  rentalPrice: number;
  photoUrl?: string;
}

export interface CreateVehicleRequest {
  displayName: string;
  registrationNumber: string;
  year: number;
  make: string;
  model: string;
  mileage: number;
  fuelType: string;
  licenseExpiryDate: string;
  vehicleStatus: string;
  rentalPrice: number;
  photoUrl?: string;
}

export interface PatchVehicleRequest {
  id: number;
  displayName?: string;
  registrationNumber?: string;
  year?: number;
  make?: string;
  model?: string;
  mileage?: number;
  fuelType?: string;
  licenseExpiryDate?: string;
  vehicleStatus?: string;
  rentalPrice?: number;
  photoUrl?: string;
}
