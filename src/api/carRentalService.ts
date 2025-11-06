"use client";

import {
  CreateCustomerRequest,
  CustomerResponse,
  PatchCustomerRequest,
} from "./models/customer.interface";
import {
  CreateRentalRequest,
  PatchRentalRequest,
  RentalResponse,
} from "./models/rental.interface";
import { SearchRequest, SearchResponse } from "./models/search.interface";
import {
  CreateVehicleRequest,
  PatchVehicleRequest,
  VehicleResponse,
} from "./models/vehicle.interface";

export const CarRentalService = {
  searchVehicles: async function (req: SearchRequest) {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle/search`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );

    return await response.json();
  },

  searchCustomers: async function (
    req: SearchRequest
  ): Promise<SearchResponse<CustomerResponse>> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/search`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );

    return await response.json();
  },

  createCustomer: async function (
    req: CreateCustomerRequest
  ): Promise<CustomerResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/create`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );

    return await response.json();
  },

  patchCustomer: async function (
    req: PatchCustomerRequest
  ): Promise<CustomerResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/${req.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "PATCH",
      }
    );

    return await response.json();
  },

  deleteCustomer: async function (id: number): Promise<void> {
    const bearer = localStorage.getItem("DS");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify({}),
      cache: "no-store",
      method: "DELETE",
    });
  },

  createVehicle: async function (
    req: CreateVehicleRequest
  ): Promise<VehicleResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle/create`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );
    return await response.json();
  },

  patchVehicle: async function (
    req: PatchVehicleRequest
  ): Promise<VehicleResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle/${req.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "PATCH",
      }
    );
    return await response.json();
  },

  deleteVehicle: async function (id: number): Promise<void> {
    const bearer = localStorage.getItem("DS");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicle/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify({}),
      cache: "no-store",
      method: "DELETE",
    });
  },

  searchRentals: async function (
    req: SearchRequest
  ): Promise<SearchResponse<RentalResponse>> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rental/search`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );

    return await response.json();
  },

  createRental: async function (
    req: CreateRentalRequest
  ): Promise<RentalResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rental/create`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "POST",
      }
    );
    return await response.json();
  },

  patchRental: async function (
    req: PatchRentalRequest
  ): Promise<RentalResponse> {
    const bearer = localStorage.getItem("DS");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rental/${req.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          Authorization: `Bearer ${bearer}`,
        },
        cache: "no-store",
        body: JSON.stringify(req),
        method: "PATCH",
      }
    );
    return await response.json();
  },

  deleteRental: async function (id: number): Promise<void> {
    const bearer = localStorage.getItem("DS");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rental/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify({}),
      cache: "no-store",
      method: "DELETE",
    });
  },
};
