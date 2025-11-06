"use client";

import { CarRentalService } from "@/api/carRentalService";
import VehicleCard from "@/components/vehicleCard/vehicleCard";
import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./landing.module.css";
import { TextField } from "@mui/material";
import { SearchRequest } from "@/api/models/search.interface";

export default function LandingPage() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState<SearchRequest>({
    filters: [],
    logicalOperator: "or",
    orderBy: [],
    pageSize: 100,
    page: 1,
  })

  useEffect(() => {
    (async function () {
      try {
        var response = await CarRentalService.searchVehicles(search);
        setVehicles(response.data);
      } catch (e) { }
    })();
  }, [search]);
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <TextField id="outlined-basic" label="Search Vehicles" variant="outlined" className={styles.searchBar} onChange={(event) => {
          if (event.target.value === '' || !event.target.value) {
            setSearch({
              ...search, filters: []
            })
          }
          else {
            setSearch({
              ...search, filters: [{
                operator: '=',
                value: event.target.value,
                propertyName: 'displayName'
              }]
            })
          }

        }} />
      </div>

      <div className={styles.vehicleGrid}>
        {vehicles &&
          vehicles.map((item, index) => (
            <VehicleCard vehicle={item} key={index}></VehicleCard>
          ))}
      </div>
    </div>
  );
}

