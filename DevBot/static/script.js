document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    window.sendMessage = async function () {
        const message = input.value.trim();
        if (!message) return;

        addMessage('You', message, 'text-right text-blue-700 bg-gray-50');
        input.value = '';
        input.focus();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage('Bot', data.reply, 'text-left text-gray-900 bg-blue-100');
            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (error) {
            addMessage('Error', 'Error. Try again later.', 'text-center text-red-600');
        }
    };

    function addMessage(sender, text, style) {
        const container = document.createElement('div');

        // Align based on sender
        container.className = sender === 'You' ? 'flex justify-end my-2' : 'flex justify-start my-2';

        const msg = document.createElement('div');
        msg.className = `inline-block max-w-fit p-2 rounded shadow break-words ${style}`;

        // Markdown 
        const parsedMarkdown = marked.parse(text);
        msg.innerHTML = `<strong>${sender}:</strong><div class="prose">${parsedMarkdown}</div>`;

        container.appendChild(msg);
        chatBox.appendChild(container);
    }

});
