document.addEventListener('DOMContentLoaded',  () => {
  API_LINK='http://127.0.0.1:5000';
  const chatdisplay=document.querySelector('#chat_display');
  const form=document.querySelector("#form_id");
  const chatinput=document.querySelector("#chat_input");

  if (!chatdisplay || !form || !chatinput){
    return alert("Error");
  }
  


   async function handleSubmit(){
        const data = chatinput.value.trim();

        if(data){
            addtextMessage(data,'user');
            chatinput.value='';
        }
        const newdiv = document.createElement("div");
        newdiv.className='message ai_message';
        newdiv.innerHTML='Generating...';
        chatdisplay.appendChild(newdiv);
        chatdisplay.scrollTop=chatdisplay.scrollHeight;

        //APi call
        try{

            const response = await fetch(
                `${API_LINK}/api/Nutrition`,
                {
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({prompt:data}),
                }
            );

           const ai_response=await response.json();
           newdiv.innerHTML=marked.parse(ai_response.response);

        }catch(error){
            newdiv.innerHTML=`Something went wrong with API ${error}`;
        }

   }


  function addtextMessage(message,sender){
    const newdiv = document.createElement('div');
    newdiv.className=`message ${sender}_message`;

    if (sender ==='ai'){
        newdiv.innerHTML = marked.parse(message);

    }
    else{
        newdiv.innerHTML = message;
    }
    
    chatdisplay.appendChild(newdiv);
    chatdisplay.scrollTop=chatdisplay.scrollHeight;


  }



  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleSubmit();
  })
})