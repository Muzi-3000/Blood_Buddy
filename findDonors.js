// Firebase initialization and other JavaScript code for this page
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
// Add event listener to the form for form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bloodType = document.getElementById('bloodType').value;

    // Store receiver details in the "receivers" collection
    firebase.firestore().collection('receivers').add({
        fullName: fullName,
        age: age,
        gender: gender,
        bloodType: bloodType
    }).then((docRef) => {
        console.log("Receiver details stored with ID: ", docRef.id);

        // Query the "donors" collection for users with the same blood type
        firebase.firestore().collection('donors').where('bloodType', '==', bloodType)
            .get()
            .then((querySnapshot) => {
                let donorDetailsHTML = '';
                querySnapshot.forEach((doc) => {
                    // Construct the donor details
                    const donorData = doc.data();
                    donorDetailsHTML += `<div class="donor-details">
                                            <strong>Name:</strong> ${donorData.fullName}<br>
                                            <strong>Age:</strong> ${donorData.age}<br>
                                            <strong>Gender:</strong> ${donorData.gender}<br>
                                            <strong>Blood Type:</strong> ${donorData.bloodType}<br>
                                            <strong>Mobile Number:</strong> ${donorData.mobileNumber}
                                        </div>`;
                });

                // Update the donor details inside the container
                document.getElementById('donorContainer').innerHTML = donorDetailsHTML;
            })
            .catch((error) => {
                console.error("Error getting donors: ", error);
            });
    }).catch((error) => {
        console.error("Error storing receiver details: ", error);
    });
});
