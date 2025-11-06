export interface CustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export interface PatchCustomerRequest {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
}
