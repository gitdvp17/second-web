
            document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('.submit-btn');
            const statusDiv = document.getElementById('statusMessage');
            const formData = new FormData(this);
            
            // Clear previous status
            statusDiv.innerHTML = '';
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            button.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
            
            // Send to FormSpree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                // Success
                button.classList.add('success-animation');
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                statusDiv.innerHTML = '<div class="status-message success">✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon!</div>';
                
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                button.textContent = 'Send Message';
                button.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                
                statusDiv.innerHTML = '<div class="status-message error">❌ There was an error sending your message. Please try again or contact us directly.</div>';
            })
            .finally(() => {
                button.disabled = false;
                setTimeout(() => {
                    button.classList.remove('success-animation');
                    button.textContent = 'Send Message';
                    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 3000);
            });
        });

        // Add interactive hover effects
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.parentElement.style.transform = 'translateX(5px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.parentElement.style.transform = 'translateX(0)';
            });
        });