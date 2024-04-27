const firebaseConfig = {
    apiKey: "AIzaSyBHXwlGz6J2SniqyH_9wHhYKPVRS526gc8",
    authDomain: "register-d7937.firebaseapp.com",
    databaseURL: "https://register-d7937-default-rtdb.firebaseio.com",
    projectId: "register-d7937",
    storageBucket: "register-d7937.appspot.com",
    messagingSenderId: "390180645619",
    appId: "1:390180645619:web:a6e2572a506646a91c6586",
    measurementId: "G-3KGX47WBFF"
};
firebase.initializeApp(firebaseConfig);
// Get a reference to the Firestore database service
const db = firebase.firestore();

// Add event listener to the form for form submission
document.getElementById('helpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Store help details in the "help" collection
    db.collection('help').add({
        name: name,
        email: email,
        phone: phone,
        message: message
    }).then(() => {
        console.log("Help details stored successfully");

        // Optionally, you can redirect the user to a thank you page or display a success message
        // window.location.href = 'thank-you.html';
        alert("Your message has been sent. We'll get back to you soon!");
    }).catch((error) => {
        console.error("Error storing help details: ", error);
        alert("An error occurred. Please try again later.");
    });
});