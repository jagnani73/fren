"""
tf-idf
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction import text
import nltk

from nltk.corpus import stopwords

def tfidf(input):

    corpus = input
    stop_words = set(stopwords.words('english')) #define stopwords
    vectorizer = TfidfVectorizer()
    #print(vectorizer.get_feature_names())
    my_stop_words = text.ENGLISH_STOP_WORDS.union(stop_words)

    vectorizer = TfidfVectorizer(ngram_range=(1,1), stop_words=my_stop_words)

    X = vectorizer.fit_transform(corpus)

    idf_values = dict(zip(vectorizer.get_feature_names(), vectorizer.idf_))

    return idf_values # printing the vocabulary

if __name__=="__main__":
    print(tfidf(["abhishek aashi ananya car saisha "]))