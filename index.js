function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }


  function setBackgroundColor(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add("bg-orange-400");
  }

  function removeBackgroundColor(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove("bg-orange-400");
  }

  function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add("hidden");
  }
  function showElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove("hidden");
  }

  function next() {
    hideElementById('home-section')
    showElementById('pop-up')
  }

  function closePopup() {
    hideElementById('pop-up')
    showElementById('home-section')
  }



// Global variable to store the total number of available seats
let totalSeats = 40;
// Array to store the IDs of selected seats
let selectedSeats = [];

// Function to handle seat selection
function selectSeat(seatId) {
const seat = document.getElementById(seatId);

// Check if the seat is already selected
if (seat.classList.contains('selected')) {
  // If already selected, remove it from the selected seats
  seat.classList.remove('selected');
  // Remove the seat ID from the selectedSeats array
  const index = selectedSeats.indexOf(seatId);
  if (index !== -1) {
    selectedSeats.splice(index, 1);
  }
  // Increment the total number of available seats
  totalSeats++;
} else {
  // Check if the maximum limit of 4 seats is reached
  if (selectedSeats.length >= 4) {
    // If the limit is reached, show an alert and return
    alert('You can select a maximum of 4 seats at a time.');
    return;
  }

  // If not selected and limit is not reached, add it to the selectedSeats array
  seat.classList.add('selected');
  // Add the seat ID to the selectedSeats array
  selectedSeats.push(seatId);
  // Decrement the total number of available seats
  totalSeats--;
}

// Update the display to show the updated total seats count
document.getElementById('totalSeats').innerText = totalSeats;
updateSelectedSeatsTable();
checkPassengerInfo();
updateSelectedSeatsCount()
}

function updateSelectedSeatsCount() {
const selectedSeatsCount = selectedSeats.length;
document.getElementById('selectedSeatsCount').innerText = selectedSeatsCount;
}

// Function to update the table with selected seats
function updateSelectedSeatsTable() {
const tableBody = document.getElementById('selectedSeatsTableBody');
const totalPriceElement = document.getElementById('totalPrice'); // Get the total price element

tableBody.innerHTML = '';
let totalPrice = 0; // Initialize total price variable

for (const seatId of selectedSeats) {
  const row = document.createElement('tr');
  const seatCell = document.createElement('td');
  seatCell.textContent = seatId;
  row.appendChild(seatCell);

  const classCell = document.createElement('td');
  classCell.textContent = 'Economy'; // You can change this dynamically based on seat type
  row.appendChild(classCell);

  const priceCell = document.createElement('td');
  const seatPrice = 500; // You can change this dynamically based on seat price
  priceCell.textContent = seatPrice;
  totalPrice += seatPrice; // Add seat price to total price
  row.appendChild(priceCell);

  tableBody.appendChild(row);
}

// Display the total price in the total price element
totalPriceElement.textContent = 'BDT: ' + totalPrice;
}

function applyCoupon() {
// Get the value from the coupon code input field
const couponInput = document.getElementById('couponInput');
const couponCode = couponInput.value.trim();

// Define discount percentages for valid coupon codes
const discounts = {
  'NEW15': 15,
  'Couple 20': 20
};

// Check if the entered coupon code is valid
if (couponCode in discounts) {
  // Get the discount percentage for the entered coupon code
  const discountPercentage = discounts[couponCode];

  // Get the total price from the total price element
  const totalPriceElement = document.getElementById('totalPrice');
  const totalPrice = parseFloat(totalPriceElement.textContent.split(' ')[1]);

  // Calculate the discount amount
  const discountAmount = (totalPrice * discountPercentage) / 100;

  // Calculate the grand total after applying the discount
  const grandTotal = totalPrice - discountAmount;

  // Update the grand total section with the discounted price
  const grandTotalElement = document.getElementById('grandTotal');
  grandTotalElement.textContent = 'BDT ' + grandTotal;
} else {
  // If the entered coupon code is not valid, display an error message or handle it as needed
  alert('Invalid coupon code!');
}
}

function checkPassengerInfo() {
// Check if a seat is selected
const selectedSeats = document.getElementsByClassName('selected');
const seatSelected = selectedSeats.length > 0;

// Check if passenger name and phone number are provided
const passengerName = document.getElementById('passengerName').value.trim();
const phoneNumber = document.getElementById('phoneNumber').value.trim();
const infoProvided = passengerName !== '' && phoneNumber !== '';

// Enable or disable the "Next" button based on seat selection and provided information
const nextButton = document.getElementById('nextButton');
nextButton.disabled = !(seatSelected && infoProvided);
}

function onPassengerInfoChange() {
checkPassengerInfo();
}



function resetSelectedSeats() {
    selectedSeats = []; // Reset selectedSeats array to an empty array
  }
  
  // Function to reset passenger information
  function resetPassengerInfo() {
    // Iterate over each property in the passengerInfo object
    for (const key in passengerInfo) {
      // Reset the value of each property to its initial value (empty string)
      passengerInfo[key] = "";
    }
  }
  