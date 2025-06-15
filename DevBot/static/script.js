document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    window.sendMessage = async function () {
        const message = input.value.trim();
        if (!message) return;

        addMessage('You', message, 'user');

        input.value = '';
        input.focus();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage('DevAI', data.reply, 'bot');

            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            addMessage('Error', 'Could not connect to server.', 'error');
        }
    };

function addMessage(sender, text, type) {
    const msg = document.createElement('div');
    msg.classList.add('flex', 'w-full');

    if (type === 'user') {
        msg.classList.add('justify-end');
        const parsedMarkdown = marked.parse(text);
        msg.innerHTML = `
            <div class="flex items-end gap-2 justify-end">
                <div class="bg-blue-600 text-white px-4 py-2 rounded-lg w-fit max-w-[80%] markdown-content">
                    ${parsedMarkdown}
                </div>
                <div class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
            </div>
        `;
    } else if (type === 'bot') {
        msg.classList.add('justify-start');
        const parsedMarkdown = marked.parse(text);
        msg.innerHTML = `
            <div class="flex items-end gap-2">
                <div class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 17v-2a4 4 0 014-4h3M7 10v1a2 2 0 002 2h1m7-7v1a2 2 0 002 2h1"/>
                    </svg>
                </div>
                <div class="bg-gray-200 text-black px-4 py-2 rounded-lg w-fit max-w-[80%] markdown-content">
                    ${parsedMarkdown}
                </div>
            </div>
        `;
    } else if (type === 'error') {
        msg.classList.add('justify-center');
        msg.innerHTML = `
            <div class="bg-red-100 text-red-700 px-4 py-2 rounded-lg w-fit max-w-[80%] text-center">
                ${text}
            </div>
        `;
    }

    chatBox.appendChild(msg);
}

});
