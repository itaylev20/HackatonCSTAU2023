import logging
import azure.functions as func
from flask import Flask, request, render_template, redirect,url_for
import functools

app = Flask(__name__)



@app.route('/')
def main():
    bus_lines= [i for i in range(190)]
    return render_template(f"main.html",bus_lines=bus_lines)



