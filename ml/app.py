"""

Flask
Internal api

"""

#import Core
from flask import Flask,render_template,request,redirect,url_for,Response
import json
import senti as S
import tfidf 
import wordsimilarity as Ws
import random

ch = "abcdefghijklmnopqrstuvwxyz123456789"
app = Flask(__name__)

@app.route('/api',methods = ['POST'])
def login():
   print(request.json)
   res = request.get_json()
   uID  = res["userId"]
   tID = res["therapistId"]
   notes = res["notes"]
   ...
   #return Response(json.dumps(user,indent=2),mimetype='application/json')
   return Response(json.dumps(user),mimetype='application/json')

def senti_helper(post,fun):
   A = S.sentiment_analysis(post["log"])
   temp = {
      "noteId":post["_id"],
      "time":post["date"],
      "score":A
   }
   return temp

def CombSep(notes):
   B = []
   for i in notes:
      B.append(i["log"])
   return B

def breaker(A):
   Y = {0.05:0, 0.1:1, 0.3:2, 0.5:3, 0.7:4, 0.9:5}
   for i in Y:
      if A < i:
         return Y[i]

def Pairs(arr):
   B = []
   for i in arr:
      if arr[i] > 1:
         B.append([i,arr[i]])

   C = []
   for j in range(len(B)):
      for i in range(j,len(B)):
         if i!=j:
            tem = breaker(Ws.similar(B[i][0],B[j][0]))
            if tem > 0.5: 
               C.append({"id":randomnamegenarator(),
                "from":B[j][0],
                "to":B[i][0],
                "value":tem})

   Send = {"network":{
      "nodes":[{"id":randomnamegenarator(), "label":i[0]} for i in B],
      "edges": C
   }}
   print(json.dumps(Send, indent=4, sort_keys=True))

def randomnamegenarator():
   return "".join([random.choice(ch) for i in range(5)])



if __name__ == '__main__':
   #app.run(host="0.0.0.0", port=8080,debug=True)
   R = {
          "_id": "5f69dc5408009d1718b25edf",
          "userId": "5f69dc132b94c92da8f1785f",
          "log": "Maine aaj dhoka khaya.",
          "date": 1602307428860,
   }
   T = {
         "_id": "5f69dc5408009d1718b25edf",
          "userId": "5f69dc132b94c92da8f1785f",
          "log": "Mera roz kat ta hai guys",
          "date": 1602307428860,
   }
   
   #print(helper(T,tfidf.tfidf))
   print(Pairs(tfidf.tfidf(CombSep([T,R]))))
   #print(breaker(0.41))

