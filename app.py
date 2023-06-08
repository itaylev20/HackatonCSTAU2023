from flask import Flask, request, render_template, redirect,url_for
import csv
import json
app = Flask(__name__)

ROUTES_FILE_PATH = "data/routes.txt"

@app.route('/')
def main():
    bus_lines= [i for i in range(190)]
    return render_template(f"main.html",bus_lines=bus_lines)


@app.route('/get_routes')
def get_routes():
    with open(ROUTES_FILE_PATH, "r", encoding='utf-8') as file:
        csv_reader = csv.reader(file,)
        headers = next(csv_reader)
        headers[0]="route_id"
        # Create a list of dictionaries
        routes = []
        for row in csv_reader:
            route = {key: value for key, value in zip(headers, row)}
            routes.append(route)

    # Print the list of dictionaries
    return json.dumps(routes)

