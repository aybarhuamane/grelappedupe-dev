import pandas as pd

def read_excel(file):
    df = pd.read_excel(file,sheet_name=0)
    return df.to_dict(orient='records')