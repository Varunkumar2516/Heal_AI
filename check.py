import streamlit as st
from backend import healthAssistant
input=st.text_area("ENter the input ")

but=st.button("SUbmit ")
if but and input:
    with st.spinner():
        response=healthAssistant(input)
    st.write(response)


