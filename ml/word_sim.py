import spacy
nlp = spacy.load('en')
import warnings
warnings.filterwarnings('ignore')

def wordsim(int1,int2):
    doc1=nlp(int1)
    doc2=nlp(int2)

    return doc1[0].similarity(doc2[0])    
if __name__=="__main__":
    print(wordsim("dog is a man","pig"))