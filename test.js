import VehicleModel from "./models/vehicleModel.js";
import main from "./main.js";

class testModel {
    constructor(model, expectedTollFee, testNumber) {
        this.model = model;
        this.expectedTollFee = expectedTollFee;
        this.testNumber = testNumber
    }
}

/**
 * Mockad data jag använde för att testa olika scenarion. 
 */
const mockVehicles = [
    // Testar tider innanför och utanför tidsramen.
    new testModel(
        new VehicleModel('Truck', [new Date(2021, 5, 15, 4, 33), new Date(2021, 5, 15, 6, 43), new Date(2021, 5, 15, 11, 35)]),
        25,
        1
    ),
    // Testar tider innanför och utanför tidsramen.
    new testModel(
        new VehicleModel('Bus', [new Date(2021, 5, 15, 10, 33), new Date(2021, 5, 15, 11, 13), new Date(2021, 5, 15, 15, 33), new Date(2021, 5, 15, 16, 13), new Date(2021, 5, 15, 20, 2)]),
        31,
        2
    ),
    // Testar tider innom en timme
    new testModel(
        new VehicleModel('Car', [new Date(2021, 5, 15, 14, 13), new Date(2021, 5, 15, 15, 3), new Date(2021, 5, 15, 18, 11), new Date(2021, 5, 15, 18, 52)]),
        18,
        3
    ),
    // Testar dag innan röd dag.
    new testModel(
        new VehicleModel('Car', [new Date(2021, 3, 1, 10, 33)]),
        0,
        4
    ),
    // Testar röd dag.
    new testModel(
        new VehicleModel('Car', [new Date(2021, 3, 2, 10, 33),]),
        0,
        5
    ),
    // Testar juli månad
    new testModel(
        new VehicleModel('Car', [new Date(2020, 6, 13, 10, 33)]),
        0,
        6
    ),
    // Allt här under skall inte gå igenom
    new testModel(
        new VehicleModel('Motorbike', [new Date(2018, 11, 20, 10, 33)]),
        0,
        7
    ),
    new testModel(
        new VehicleModel('Tractor', [new Date(2018, 11, 20, 10, 33)]),
        0,
        8
    ),
    new testModel(
        new VehicleModel('Emergency', [new Date(2018, 11, 20, 10, 33)]),
        0,
        9
    ),
    new testModel(
        new VehicleModel('Diplomat', [new Date(2018, 11, 20, 10, 33)]),
        0,
        10
    ),
    new testModel(
        new VehicleModel('Foreign', [new Date(2018, 11, 20, 10, 33)]),
        0,
        11
    ),
    new testModel(
        new VehicleModel('Military', [new Date(2018, 11, 20, 10, 33)]),
        0,
        12
    ),
    new testModel(
        new VehicleModel(),
        0,
        13
    ),
    // Lördag
    new testModel(
        new VehicleModel('Car', [new Date(2021, 5, 12, 11, 13), new Date(2021, 5, 12, 16, 13), new Date(2021, 5, 12, 22, 34)]),
        0,
        15
    ),
    // Söndag
    new testModel(
        new VehicleModel('Car', [new Date(2021, 5, 13, 11, 13), new Date(2021, 5, 13, 16, 13), new Date(2021, 5, 13, 22, 34)]),
        0,
        16
    ),
]

/**
 * Kör igenom vårat program med den mockade datan. 
 */
async function test() {
    for (const vehicle of mockVehicles) {
        const fee = await main(vehicle.model)
        if (vehicle.expectedTollFee === fee) {
            console.log(vehicle.testNumber, 'Succsess', vehicle.expectedTollFee, fee);
        } else {
            console.log(vehicle.testNumber, 'Fail', vehicle.expectedTollFee, fee);
        }
    }
}

test();