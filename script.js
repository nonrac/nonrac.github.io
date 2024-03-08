// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdMyd6eEhAH2y05D-14JkmTYH-TXLJOMo",
    authDomain: "big-pact-384923.firebaseapp.com",
    projectId: "big-pact-384923",
    storageBucket: "big-pact-384923.appspot.com",
    messagingSenderId: "488771674555",
    appId: "1:488771674555:web:ae15939f4fb967abc5249e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const fileName = file.name.split('.').slice(0, -1).join('_').toLowerCase().replace(/\s/g, "_");
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(fileName);
    await imageRef.put(file);
    const imageURL = await imageRef.getDownloadURL();
    document.getElementById('result').innerHTML = `<a href="${imageURL}" target="_blank">${imageURL}</a>`;
}
