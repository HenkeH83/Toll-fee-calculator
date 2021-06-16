const tollableVehicles = ['CAR', 'TRUCK', 'BUS']
/**
 * Kontrollerar hurvida ett fordonet skall debiteras trängselskatt utifrån dess typ.
 * @param {VehicleModel} vehicle - Fordonet som skall kontrolleras.
 * @returns {Boolean}
 */
export default function isTollableVehicle(vehicle) {
    return tollableVehicles.includes(vehicle?.toUpperCase())
}