from flask import Flask,request,jsonify,render_template
from flask_cors import CORS

from backend import healthAssistant,Nutrition_expert,FirstAid_expert,Medical_expert

app=Flask(__name__)
CORS(app)
def helperFunction(funct,data,data_key):
    try:
        required_data=data[data_key]

        response=funct(required_data)

        return jsonify({'response':response})
    except Exception as e:
         return jsonify({'response':f"{response} : {e}"})

@app.route("/")
def home():
    return render_template("final.html")


@app.route("/api/health",methods=['POST'])
def health():
    return helperFunction(healthAssistant,request.json,'prompt')


@app.route("/api/Nutrition",methods=["POST"])
def nutrition():
    return helperFunction(Nutrition_expert,request.json,'prompt')

@app.route("/api/firstaid",methods=["POST"])
def firstaid():
    return helperFunction(FirstAid_expert,request.json,'prompt')
@app.route("/api/medical",methods=["POST"])
def medical():
    return helperFunction(Medical_expert,request.json,'prompt')
app.run(debug=True,port=5000)