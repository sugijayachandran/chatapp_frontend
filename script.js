document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatHeader = document.getElementById('chat-header');
    const contactsList = document.getElementById('contacts-list');
    const profileView = document.getElementById('profile-view');

    const contacts = [
        { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/100', bio: 'Hey, I am John!' },
        { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/100', bio: 'Hello, I am Jane!' }
    ];

    let selectedContact = null;

    function appendMessage(user, message, isBot = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isBot ? 'bot' : 'user');
        messageElement.innerHTML = `<span class="user">${user}:</span> <span class="text">${message}</span>`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    function showProfile(contact) {
        profileView.innerHTML = `
            <h2>${contact.name}</h2>
            <img src="${contact.avatar}" alt="${contact.name}">
            <p>${contact.bio}</p>
        `;
        profileView.style.display = 'block';
    }

    function populateContacts() {
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = contact.name;
            li.addEventListener('click', () => {
                selectedContact = contact;
                chatHeader.textContent = contact.name;
                chatBox.innerHTML = '';
                profileView.style.display = 'none';
            });
            contactsList.appendChild(li);
        });
    }

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message && selectedContact) {
            appendMessage('You', message);
            messageInput.value = '';

            // Simulate receiving a response from the bot
            setTimeout(() => {
                appendMessage('Bot', 'This is a simulated response.');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Populate contacts on load
    populateContacts();
    
    // Show profile when clicking on a contact
    contactsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const contactName = event.target.textContent;
            const contact = contacts.find(c => c.name === contactName);
            if (contact) {
                showProfile(contact);
            }
        }
    });
});
