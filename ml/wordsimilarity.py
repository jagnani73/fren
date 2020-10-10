from difflib import SequenceMatcher

def similar(input1, input2):
    return SequenceMatcher(None, input1, input2).ratio()
