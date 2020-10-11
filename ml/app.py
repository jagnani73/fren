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
   res = request.get_json()
   uID  = res["userId"]
   tID = res["therapistId"]
   notes = res["notes"]
   A = []
   for i in notes:
      A.append(senti_helper(i))
   B={
      "therapistId": tID,
      "userId": uID,   
   }
   X = CombSep(notes)
   X = tfidf.tfidf(X)
   X = Pairs(X)

   J =  Three_Ka_thing(notes)
   #return Response(json.dumps(user,indent=2),mimetype='application/json')
   print(len(J),len(notes))
   print(J)
   Z=[]
   for i in range(len(notes)-2):
      Z.append({"noteId":notes[i]["_id"],"words":J[i]})
   return Response(json.dumps({**B,"sentiment":A,"wordAnalysis":Z,**X}),mimetype='application/json')

def senti_helper(post):
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
            
            if tem == None:
               tem =0
            if tem >= 5: 
               C.append({"id":randomnamegenarator(),
                "from":B[j][0],
                "to":B[i][0],
                "value":tem})

   Send = {"network":{
      "nodes":[{"id":randomnamegenarator(), "label":i[0]} for i in B],
      "edges": C
   }}
   return Send

def randomnamegenarator():
   return "".join([random.choice(ch) for i in range(5)])

def Three_Ka_thing(notes):
   A = 3
   U = []
   for i in range(len(notes) - (A-1)):
      x = tfidf.tfidf(CombSep(notes[i:i+A]))
      y = {k: v for k, v in sorted(x.items(), key=lambda item: item[1])}
      U.append(list(y.keys())[-5:])
   return U


if __name__ == '__main__':
   app.run(host="0.0.0.0", port=8080,debug=True)


   #print(helper(T,tfidf.tfidf))
   
   #print(breaker(0.41))
   #print(ThreeKathing([I,J,K,L,M]))

