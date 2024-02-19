
// Create the function that is click a button then move to another section
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

// Select the button and pop-up section
const nextButton = document.getElementById("nextButton");
const popupSection = document.getElementById("pop-up");
const modal = document.getElementById("my_modal_1");

// Add click event listener to the next button
nextButton.addEventListener("click", function() {
  // Remove the 'hidden' class to show the pop-up
  popupSection.classList.remove("hidden");
  
  // Call the showModal() function
  modal.showModal();
});

modal.addEventListener("close", function() {
  popupSection.classList.add("hidden");
});

// the total number of available seats
let totalSeats = 40;
// Array to add the ids of selected seats
let selectedSeats = [];
function selectSeat(seatId) {
const seat = document.getElementById(seatId);

// Checking if the seat is already selected
if (seat.classList.contains('selected')) {
seat.classList.remove('selected');
const index = selectedSeats.indexOf(seatId);
if (index !== -1) {
  selectedSeats.splice(index, 1);
}
// Increase the total number of available seats
totalSeats++;
} else {
if (selectedSeats.length >= 4) {
  // If the limit is reached, show an alert and return
  alert('You can select a maximum of 4 seats at a time.');
  return;
}

// If not selected and limit is not reached
seat.className += ' selected';
// add the seat ID to the selectedSeats array
selectedSeats.push(seatId);
// Decrement the total number of available seats
totalSeats--;
}

// Update display to show updated total seats count
document.getElementById('totalSeats').innerText = totalSeats;
updateSelectedSeatsTable();
checkPassengerInfo();
updateSelectedSeatsCount()
}

function updateSelectedSeatsCount() {
const selectedSeatsCount = selectedSeats.length;
document.getElementById('selectedSeatsCount').innerText = selectedSeatsCount;
}

// update table with selected seats
function updateSelectedSeatsTable() {
const tableBody = document.getElementById('selectedSeatsTableBody');
const totalPriceElement = document.getElementById('totalPrice'); 

// Get the total price element

tableBody.innerHTML = '';
let totalPrice = 0; 
for (const seatId of selectedSeats) {
const row = document.createElement('tr');
const seatCell = document.createElement('td');
seatCell.innerText = seatId;
row.appendChild(seatCell);

const classCell = document.createElement('td');
classCell.innerText = 'Economy'; 
row.appendChild(classCell);

const priceCell = document.createElement('td');
const seatPrice = 500; 
priceCell.innerText = seatPrice;
totalPrice += seatPrice;
row.appendChild(priceCell);

tableBody.appendChild(row);
}

totalPriceElement.textContent = 'BDT: ' + totalPrice;
}

function applyCoupon() {
// Get the value from the coupon code input field
const couponInput = document.getElementById('couponInput');
const couponCode = couponInput.value.trim();

// discount percentages for valid coupon codes
const discounts = {
'NEW15': 15,
'Couple 20': 20
};


if (couponCode in discounts) {
const discountPercentage = discounts[couponCode];

const totalPriceElement = document.getElementById('totalPrice');
const totalPrice = parseFloat(totalPriceElement.textContent.split(' ')[1]);

const discountAmount = (totalPrice * discountPercentage) / 100;

// Calculate the grand total after applying the discount
const grandTotal = totalPrice - discountAmount;

// Update the grand total section with the discounted price
const grandTotalElement = document.getElementById('grandTotal');
grandTotalElement.textContent = 'BDT ' + grandTotal;
} else {
// If the entered coupon code is not valid, display an error message 
alert('Invalid coupon code!');
}
}

function checkPassengerInfo() {
// Checking if a seat is selected
const selectedSeats = document.getElementsByClassName('selected');
const seatSelected = selectedSeats.length > 0;

// Checking if passenger name and phone number are provided
const passengerName = document.getElementById('passengerName').value.trim();
const phoneNumber = document.getElementById('phoneNumber').value.trim();
const infoProvided = passengerName !== '' && phoneNumber !== '';

// Enable or disable the "Next" button based on seat selection and provided information
const nextButton = document.getElementById('nextButton');
nextButton.disabled = !(seatSelected && infoProvided);
}
