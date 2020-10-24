const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

// get username and room from query params
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// join chatroom
socket.emit('joinRoom', { username, room })

socket.on('message', data => {
    outputMessage(data)

    console.log(data);
    // scroll down automatically
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault()

    // get message text
    const msg = e.target.elements.msg.value

    // send message to server
    socket.emit('chatMessage', msg)

    // clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// output message to DOM
function outputMessage(data) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
        <p class="meta">${data.username} <span>${data.time}</span></p>
        <p class="text">
            ${data.text}
        </p>
    `

    // append div 
    document.querySelector('.chat-messages').appendChild(div)
}