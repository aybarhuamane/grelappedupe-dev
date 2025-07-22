import csv

def read_csv(file):
    decoded_file = file.read().decode('utf-8').splitlines()
    return list(csv.DictReader(decoded_file))
