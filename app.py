from flask import Flask, render_template, request, redirect, json
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
        password VARCHAR(64) NOT NULL
    )
    """
    cursor.execute(query)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() #извлекает JSON-данные из запроса и преобразует их в словарь Python
    username = data['username']
    phone = data['phone']
    password = data['password']

    connection = create_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE username = %s AND phone = %s AND password = %s" 
    values = (username, phone, password)

    cursor.execute(query, values)
    result = cursor.fetchone() #извлекает следующую строку результата запроса и возвращает ее в виде кортежа.

    if result:
        return json.dumps({'username': result[1]})
    else:
        return json.dumps({'error': 'User not found'})


if __name__ == '__main__':
    app.run(debug=True)
