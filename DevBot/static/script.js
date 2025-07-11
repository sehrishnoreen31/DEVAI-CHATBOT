document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    window.sendMessage = async function () {
        const message = input.value.trim();
        if (!message) return;

        addMessage('You', message, 'rounded-full text-white bg-blue-500 bg-opacity-90 backdrop-blur-md max-w-[100px]');
        input.value = '';
        input.focus();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage('Bot', data.reply, 'rounded-full text-black bg-white bg-opacity-90 max-w-[100px]');
            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (error) {
            addMessage('Error', 'Error. Try again later.', 'text-red-700 bg-red-100/80 text-center');
        }
    };

    function addMessage(sender, text, style) {
        const container = document.createElement('div');
        container.className = sender === 'You' ? 'flex justify-end my-2 p-2' : 'flex justify-start my-2 p-2';

        const msg = document.createElement('div');
        msg.className = `inline-block max-w-[75%] px-4 py-2 rounded shadow break-words ${style}`;


        const parsedMarkdown = marked.parse(text);
        msg.innerHTML = `<strong class="block mb-1 text-sm">${sender}</strong><div class="prose prose-sm prose-invert">${parsedMarkdown}</div>`;

        container.appendChild(msg);
        chatBox.appendChild(container);
    }
});
