// YouTube RAG - Frontend Integration Logic
const API_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatWindow = document.getElementById('chatWindow');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);

        // Basic Markdown-ish formatting for AI responses
        if (sender === 'ai') {
            msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        } else {
            msgDiv.textContent = text;
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return msgDiv;
    };

    const setLoader = (isLoading) => {
        sendBtn.disabled = isLoading;
        sendBtn.style.opacity = isLoading ? '0.5' : '1';
        userInput.placeholder = isLoading ? 'Thinking...' : 'Ask anything about your documents...';
    };

    const handleSend = async () => {
        const text = userInput.value.trim();
        if (!text || sendBtn.disabled) return;

        addMessage(text, 'user');
        userInput.value = '';
        setLoader(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            if (response.ok) {
                addMessage(data.response, 'ai');
            } else {
                addMessage(`Error: ${data.detail || 'Something went wrong'}`, 'ai');
            }
        } catch (error) {
            addMessage('Could not connect to the backend server. Make sure it is running on port 8000.', 'ai');
        } finally {
            setLoader(false);
        }
    };

    // File Upload Implementation
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const statusLabel = document.createElement('p');
        statusLabel.style.fontSize = '0.75rem';
        statusLabel.style.color = 'var(--primary)';
        statusLabel.textContent = `Uploading ${file.name}...`;
        fileList.appendChild(statusLabel);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                statusLabel.textContent = `✓ ${file.name}`;
                statusLabel.style.color = 'var(--text-muted)';
                if (fileList.querySelector('p[style*="italic"]')) {
                    fileList.querySelector('p[style*="italic"]').remove();
                }
            } else {
                statusLabel.textContent = `✗ Error: ${file.name}`;
                statusLabel.style.color = 'var(--accent)';
            }
        } catch (error) {
            statusLabel.textContent = `✗ Connection Failed: ${file.name}`;
            statusLabel.style.color = 'var(--accent)';
        }
    };

    uploadZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        for (let file of files) {
            uploadFile(file);
        }
    });

    // Drag and Drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--primary)';
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = 'var(--border)';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--border)';
        const files = e.dataTransfer.files;
        for (let file of files) {
            uploadFile(file);
        }
    });

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
