import torch
from summarizer import Summarizer

def textsum(input):
    model = Summarizer('distilbert-base-uncased')
    resp = model(input)
    return resp