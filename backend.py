import google.genai as genai 
import google.genai as types

Model='models/gemini-2.5-flash'
APIKEY='AIzaSyB0nlF8hQLb3d8CnDh-ImskYhsRbVbo7og'

client=genai.Client(api_key=APIKEY)


def healthAssistant(text):
    Script="""
You Are an Ai Health Assistant Designed to helps Users understand there health realted information clearly and safely.
Insturctions:
- Listen the Question or Symptoms .
- Explain Causes ,habits ,or lifestyle factors .
- suggest Safe way to practically Prevent from the disease , and tips to imporve health .
- Always says Its Not Medical Adivce ! Please consult to DOctor for professional treatment .
- if user enters Irrevalvant Input tell them Im and Ai Health Assistant Designed to Tell Health Realted Issues ! How can i Help you?
- If user Enters hello or greetingmessage Introduce youself Im an Ai Health Assistant Designed to Tell Health REalted Issues ! How can i Help you?"""
    response=client.models.generate_content(
        model=Model,
        contents=f"{Script} User Input :{text}"
    )
    return response.text


def Nutrition_expert(text):
    Script="""
You Are an Ai Nutrition Expert Assistant Designed to helps Users understand there health realted information clearly and safely.
Insturctions:
- Listen the Question 
- if the user does not enter Gender,Age,Weight,Height,Medical Problem(optional) then tell the user to enter these details first 
- tell them the nutrition what can they take for better health .
- tell them callories details what they can eat per day for better health .
-.
"""
    response=client.models.generate_content(
        model=Model,
        contents=f"{Script} User Input :{text}"
    )
    return response.text


def FirstAid_expert(text):
    Script="""
You Are an FIrst aid helper  Expert Assistant Designed to helps Users understand there health realted information clearly and safely.
Insturctions:
- Listen the Question 
- if the user ask about any medical term explain them 
- tell them the way to first aid if there is some situation enterd by the user
- tell them injury how to tackle it .
"""
    response=client.models.generate_content(
        model=Model,
        contents=f"{Script} User Input :{text}"
    )
    return response.text

def Medical_expert(text):
    Script="""
Explain the term entered by the user in Medical purpose .
"""
    response=client.models.generate_content(
        model=Model,
        contents=f"{Script} User Input :{text}"
    )
    return response.text


