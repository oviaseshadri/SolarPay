// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectricityConsumption {
    struct Payment {
        uint256 datetime;
        uint256 unitsPaidFor;
        uint256 dollarAmountPaid;
    }

    struct User {
        uint256 totalUnitsPaidFor;
        uint256 unitsConsumedSinceLastPayment;
        Payment[] paymentHistory;
    }

    mapping(address => User) public users;
    // mapping(address => Payment[]) public paymentHistory;

    uint256 public DollarPerUnit;
    address public owner;

    event ConsumptionAdded(address indexed user, uint256 unitsConsumed, uint256 unitsConsumedSinceLastPayment);
    event BillPaid(
        address indexed user,
        uint256 unitsPaidFor,
        uint256 amountPaid
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(uint256 initialDollarPerUnit) {
        owner = msg.sender;
        DollarPerUnit = initialDollarPerUnit;
    }

    function setDollarPerUnit(uint256 newDollarPerUnit) external onlyOwner {
        DollarPerUnit = newDollarPerUnit;
    }

    function addConsumption(uint256 unitsConsumed) external {
        User storage user = users[msg.sender];

        // If new user, create new entry
        if (
            user.totalUnitsPaidFor == 0 &&
            user.unitsConsumedSinceLastPayment == 0 &&
            user.paymentHistory.length == 0
        ) {
            // Initialize the user struct with the provided unitsConsumed
            user.totalUnitsPaidFor = 0;
            user.unitsConsumedSinceLastPayment = unitsConsumed;
        } else {
            // If the user already exists, simply add to their unitsConsumedSinceLastPayment
            user.unitsConsumedSinceLastPayment += unitsConsumed;
        }

        emit ConsumptionAdded(msg.sender, unitsConsumed, user.unitsConsumedSinceLastPayment);
    }

    function calculateBill() public view returns (uint256) {
        User storage user = users[msg.sender];
        return user.unitsConsumedSinceLastPayment * DollarPerUnit;
    }

    function payBill() external payable {
        User storage user = users[msg.sender];
        uint256 billAmount = calculateBill();

        require(msg.value == billAmount, "Insufficient funds");

        // Increment total units paid for
        user.totalUnitsPaidFor += user.unitsConsumedSinceLastPayment;

        // Log payment in history
        Payment memory newPayment = Payment({
            datetime: block.timestamp,
            unitsPaidFor: user.unitsConsumedSinceLastPayment,
            dollarAmountPaid: msg.value
        });
        user.paymentHistory.push(newPayment);

        // Reset units consumed since last payment
        user.unitsConsumedSinceLastPayment = 0;

        emit BillPaid(msg.sender, user.totalUnitsPaidFor, msg.value);
    }

    function getPaymentHistory(address userAddress)
        external
        view
        returns (Payment[] memory)
    {
        return users[userAddress].paymentHistory;
    }
}
