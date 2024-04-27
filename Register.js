document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get input values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const bloodTypeSelect = form.querySelector('.dropdown-select');
        const bloodType = bloodTypeSelect.options[bloodTypeSelect.selectedIndex].value;
        const age = form.querySelector('input[placeholder="Age"]').value;
        const gender = form.querySelector('select').value;
        const mobileNo = form.querySelector('input[placeholder="Mobile No."]').value;

        // Basic form validation
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || bloodType.trim() === '' || age.trim() === '' || gender.trim() === '' || mobileNo.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store data in Firestore
            const db = firebase.firestore();
            await db.collection('users').add({
                name,
                email,
                password,
                bloodType,
                age,
                gender,
                mobileNo
            });

            alert('Account created successfully!');
            form.reset(); // Clear form inputs
        } catch (error) {
            console.error('Error creating account:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
