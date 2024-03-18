function showCars() {
  document.getElementById('carImage').classList.remove('hidden');
  document.getElementById('truckImage').classList.add('hidden');
}

function showTrucks() {
  document.getElementById('carImage').classList.add('hidden');
  document.getElementById('truckImage').classList.remove('hidden');
}

function search() {
  var year = document.getElementById('searchInput').value;
  // Your search logic here, maybe filter based on the year
}
