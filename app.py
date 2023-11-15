from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)
app.config['FLASK_ENV'] = 'development'  # для изменений в реальном времени


def create_connection():
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        passwd = 'plsworklaba123@',
        database='srttrash'
    )
    return connection


def create_database(connection, query):
    cursor = connection.cursor()
    cursor.execute(query)

def create_table(connection):
    cursor = connection.cursor()
    query = """
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        phone VARCHAR(40),
        password VARCHAR(40) NOT NULL
    )
    """
    cursor.execute(query)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    phone = request.form['phone']
    password = request.form['password']

    connection = create_connection()
    create_table(connection)
    cursor = connection.cursor()

    query = "INSERT INTO users (username, phone, password) VALUES(%s, %s, %s)"
    values = (username, phone, password)

    cursor.execute(query, values)
    connection.commit()

    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
