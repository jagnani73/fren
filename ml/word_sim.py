import spacy
nlp = spacy.load('en')
import warnings
warnings.filterwarnings('ignore')

def wordsim(int1,int2):
    doc1=nlp(int1)
    doc2=nlp(int2)
    for s1 in doc1 :
        for s2 in doc2 :
                return s1.similarity(s2)

