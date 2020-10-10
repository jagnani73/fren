"""

Flask
Internal api

"""

#import Core
from flask import Flask,render_template,request,redirect,url_for,Response
import json

app = Flask(__name__)


@app.route('/api',methods = ['POST'])
def login():
   print(request.json)
   user = request.get_json()
   #print(user["array"])


   #return Response(json.dumps(user,indent=2),mimetype='application/json')
   return json.dumps({"Success":"Data Recived",**user})


if __name__ == '__main__':
   app.run(host="0.0.0.0", port=8080,debug=True)
