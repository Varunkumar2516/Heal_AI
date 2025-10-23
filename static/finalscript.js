document.addEventListener('DOMContentLoaded', () => {

  const API_LINK = 'http://127.0.0.1:5000';
  const chatdisplay = document.querySelector('#chat_display');
  const form = document.querySelector('#form_id');
  const chatinput = document.querySelector('#chat_input');
  const sidebarLinks = document.querySelectorAll('.nav-link');
  const box2 = document.querySelector('.box2'); // main chat area

  let currentMode = 'health'; // default mode

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      // remove active class from all links
      sidebarLinks.forEach(l => l.classList.remove('active'));

      // add active class to clicked link
      link.classList.add('active');

      currentMode = link.dataset.target; // set mode
      chatdisplay.innerHTML = '';        // clear chat area

      changeBackground(currentMode);      // change background
      addAIMessage(getWelcomeMessage(currentMode)); // new welcome message
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
  });

  
  async function handleSubmit() {
    const data = chatinput.value.trim();
    if (!data) return;

    addTextMessage(data, 'user');
    chatinput.value = '';

    const newDiv = document.createElement('div');
    newDiv.className = 'message ai_message';
    newDiv.innerHTML = 'Generating...';
    chatdisplay.appendChild(newDiv);
    chatdisplay.scrollTop = chatdisplay.scrollHeight;

    // select API endpoint based on mode
    let endpoint = '/api/health';
    if (currentMode === 'nutrition') endpoint = '/api/Nutrition';
    else if (currentMode === 'firstaid') endpoint = '/api/firstaid';
    else if (currentMode === 'medical') endpoint = '/api/medical';

    try {
      const response = await fetch(`${API_LINK}${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: data})
      });
      const ai_response = await response.json();
      newDiv.innerHTML = marked.parse(ai_response.response);
    } catch (error) {
      newDiv.innerHTML = `Something went wrong with API: ${error}`;
    }
  }



  function addTextMessage(message, sender) {
    const newDiv = document.createElement('div');
    newDiv.className = `message ${sender}_message`;

    if (sender === 'ai') {
      newDiv.innerHTML = marked.parse(message);
    } else {
      newDiv.innerHTML = message;
    }

    chatdisplay.appendChild(newDiv);
    chatdisplay.scrollTop = chatdisplay.scrollHeight;
  }



  function addAIMessage(message) {
    addTextMessage(message, 'ai');
  }



  function getWelcomeMessage(mode) {
    switch (mode) {
      case 'nutrition':
        return 'I am a Nutrition Expert! Enter Gender, Age, Weight, Height for best advice.';
      case 'firstaid':
        return 'I am a First Aid Helper! Ask me about injuries or medical emergencies.';
      case 'medical':
        return 'I am a Medical Term Explainer! Ask me any medical term.';
      default:
        return 'I am a Health Assistant! How can I help you?';
    }
  }

  function changeBackground(mode) {
    switch (mode) {
      case 'nutrition':
        box2.style.backgroundColor = '#a40101ff'; // light pink
        break;
      case 'firstaid':
        box2.style.backgroundColor = '#e6ffe6'; // light green
        break;
      case 'medical':
        box2.style.backgroundColor = '#e6f0ff'; // light blue
        break;
      default:
        box2.style.backgroundColor = '#e6ffff'; // light cyan
    }
  }

  
  addAIMessage(getWelcomeMessage(currentMode));
  sidebarLinks[0].classList.add('active'); // highlight first link
  changeBackground(currentMode); // set initial background
});
