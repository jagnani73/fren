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

    if (polarity == 0):
            output = "Neutral"
    elif (polarity > 0 and polarity <= 0.3):
            output = "Weakly Positive"
    elif (polarity > 0.3 and polarity <= 0.6):
            output = "Positive"
    elif (polarity > 0.6 and polarity <= 1):
            output = "Strongly Positive"
    elif (polarity > -0.3 and polarity <= 0):
            output = "Weakly Negative"
    elif (polarity > -0.6 and polarity <= -0.3):
            output = "Negative"
    elif (polarity > -1 and polarity <= -0.6):
            output = "Strongly Negative"

    return output

if __name__ == "__main__":
   
    print(sentiment_analysis("I am happy today!"))
