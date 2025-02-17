var pastMonthsData = [
  [
    { category: "Food", amount: 300, month: 8, year: 2023 },
    { category: "Utilities", amount: 180, month: 8, year: 2023 },
    { category: "Entertainment", amount: 50, month: 8, year: 2023 },
    { category: "Transportation", amount: 100, month: 8, year: 2023 },
    { category: "Shopping", amount: 200, month: 8, year: 2023 },
    // Add more data as needed
  ],
  [
    { category: "Food", amount: 500, month: 7, year: 2023 },
    { category: "Utilities", amount: 140, month: 7, year: 2023 },
    { category: "Entertainment", amount: 45, month: 7, year: 2023 },
    { category: "Transportation", amount: 95, month: 7, year: 2023 },
    { category: "Shopping", amount: 180, month: 7, year: 2023 },
  ],
  [
    { category: "Food", amount: 310, month: 6, year: 2023 },
    { category: "Utilities", amount: 155, month: 6, year: 2023 },
    { category: "Entertainment", amount: 55, month: 6, year: 2023 },
    { category: "Transportation", amount: 110, month: 6, year: 2023 },
    { category: "Shopping", amount: 210, month: 6, year: 2023 },
  ],
];

// Mock data for the "Projected Savings for the Month" page
var projectedSavingsData = {
  targetSavings: 1000, // Your target savings for the month
  startIncome: 2500,
  userInflationRate: 0.05,
  beginYear: 2023,
  currentSavings: 750, // Your current savings for the month
};

let currentDate = new Date();

let totalSpending = calculateTotalSpending(
  currentDate.getMonth(),
  currentDate.getFullYear(),
);

let spendRate = dailySpending();
//
function calculateTotalSpending(month, year) {
  // Initialize the total spending to 0
  var totalSpending = 0;

  // Iterate through the pastMonthsData array
  for (var i = 0; i < pastMonthsData.length; i++) {
    var monthData = pastMonthsData[i];

    // Check if the month and year match the input
    if (
      monthData.some(function (entry) {
        return entry.month === month && entry.year === year;
      })
    ) {
      // Calculate the total spending for this month and add it to the total
      var monthlySpending = monthData.reduce(function (acc, entry) {
        return acc + entry.amount;
      }, 0);

      totalSpending += monthlySpending;
    }
  }
  return totalSpending;
}

function dailySpending() {
  var currentDate = new Date();
  var daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  var totalcurrentlySpent = calculateTotalSpending(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
  return (totalcurrentlySpent / daysInMonth).toFixed(2);
}

// Function to calculate the savings progress as a percentage
function calculateSavingsProgress(target, current) {
  if (target === 0) {
    return 0; // Avoid division by zero
  }

  let percentage = (current / target) * 100;
  return percentage;
}

// Function to predict savings based on daily spending
function predictSavings(target, spendingData) {
  var projectedSavings = target - totalSpending;
  return projectedSavings.toFixed(2);
}

// Calculate the savings progress
var savingsProgress = calculateSavingsProgress(
  projectedSavingsData.targetSavings,
  projectedSavingsData.currentSavings,
);

// Calculate and predict savings based on daily spending
var savingsPrediction = predictSavings(
  projectedSavingsData.targetSavings,
  pastMonthsData,
);

// Display the savings progress and prediction on the page (with "$" sign)
document.getElementById("targetSavingsBox").innerHTML =
  "$" + projectedSavingsData.targetSavings;
document.getElementById("currentSavingsBox").innerHTML =
  "$" + projectedSavingsData.currentSavings;
document.getElementById("savingsProgressBox").innerHTML =
  savingsProgress.toFixed(2) + "%";

// Display the savings prediction
document.getElementById("savingsPredictionBox").innerHTML =
  "$" + savingsPrediction;
