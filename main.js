import isTollableVehicle from "./components/vehicleHandler.js";
import getTollableOccations from "./components/timeHandler.js";
import getTotalFee from "./components/feeHandler.js";
/**
 * Programmets startpunkt, hanterar flödet.
 * @param {VehicleModel} vehicle - Fordon att processera.
 * @returns {Number} Avgiften som skall debiteras fordonet.
 */
export default async function main(vehicle) {
    if (!isTollableVehicle(vehicle.type)) {
        return 0;
    }
    const tollableOccations = await getTollableOccations(vehicle.occasions)
    if (tollableOccations.length > 0) {
        return getTotalFee(tollableOccations)
    } else {
        return 0
    }
}