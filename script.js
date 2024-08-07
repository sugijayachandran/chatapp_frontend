document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    function appendMessage(user, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        if (user === 'You') {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You', message);
            messageInput.value = '';

            // Simulate receiving a response
            setTimeout(() => {
                appendMessage('Bot', 'This is a simulated response.');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default Enter key action
            sendButton.click();
        }
    });
});
