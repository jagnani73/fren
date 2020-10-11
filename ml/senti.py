"""
This will classify sentiments of the user as positive or negative

"""


from textblob import TextBlob

def input_data():
       pass

def sentiment_analysis(input):
    
    polarity = 0.00
    output = ""

    analysis = TextBlob(input)
    analysis.sentiment
    polarity = analysis.sentiment.polarity

    #Fix the formating

    if (polarity == 0):
            output = 0
    elif (polarity > 0 and polarity <= 0.3):
            output = 1
    elif (polarity > 0.3 and polarity <= 0.6):
            output = 2
    elif (polarity > 0.6 and polarity <= 1):
            output = 3
    elif (polarity > -0.3 and polarity <= 0):
            output = -1
    elif (polarity > -0.6 and polarity <= -0.3):
            output = -2
    elif (polarity > -1 and polarity <= -0.6):
            output = -3

    return output

if __name__ == "__main__":
   
    print(sentiment_analysis("I am sad and happy today!"))
