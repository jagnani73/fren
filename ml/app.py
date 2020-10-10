"""

Flask
Internal api

"""

#import Core
from flask import Flask,render_template,request,redirect,url_for,Response
import json
import senti as S

app = Flask(__name__)

@app.route('/api',methods = ['POST'])
def login():
   print(request.json)
   res = request.get_json()
   uID  = res["userId"]
   tID = res["therapistId"]
   notes = res["notes"]
   

   #return Response(json.dumps(user,indent=2),mimetype='application/json')
   return Response(json.dumps(user),mimetype='application/json')

def helper(post,fun):
   A = fun(post["log"])
   temp = dict(post)
   del temp["log"]
   temp["log"] = A
   return temp

if __name__ == '__main__':
   #app.run(host="0.0.0.0", port=8080,debug=True)
   R = {
          "_id": "5f69dc5408009d1718b25edf",
          "userId": "5f69dc132b94c92da8f1785f",
          "log": "Maine aaj dhoka khaya.",
          "date": 1602307428860,
        }
   
   print(helper(R,S.sentiment_analysis))
   print(R)
