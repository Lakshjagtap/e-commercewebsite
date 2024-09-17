document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            const name = form.elements['name'].value;
            const email = form.elements['email'].value;
            const message = form.elements['message'].value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Process the form data (e.g., send to a server)
            console.log('Form submitted:', { name, email, message });
            // For now, just clear the form
            form.reset();
            alert('Your message has been sent!');
        });
    }
});
