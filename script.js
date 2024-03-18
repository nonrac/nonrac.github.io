function showCars() {
  document.getElementById('carImage').classList.remove('hidden');
  document.getElementById('truckImage').classList.add('hidden');
  document.getElementById('searchInput').classList.add('hidden');
}

function showTrucks() {
  document.getElementById('carImage').classList.add('hidden');
  document.getElementById('truckImage').classList.remove('hidden');
  document.getElementById('searchInput').classList.remove('hidden');
}

function search() {
  var year = document.getElementById('searchInput').value;
  // Your search logic here, maybe trigger a search using an API
}
