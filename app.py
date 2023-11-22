from flask import Flask, render_template, request, redirect, json
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['FLASK_ENV'] = 'development'  # для изменений в реальном времени

#note. This is a new dependancy. use "pip install roboflow" before using this
from roboflow import Roboflow
rf = Roboflow(api_key="aN58mrsroC9b5xUNVjGd")
project = rf.workspace().project("garbage-classification-3")
model = project.version(2).model

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

@app.route('/register', methods = ['POST'])
def register():
    data = request.get_json()
    username = data['username']
    phone = data['phone']
    password = data['password']

    # Генерация хеша пароля
    password_hash = generate_password_hash(password)

    connection = create_connection()
    cursor = connection.cursor()

    # Сохранение хеша пароля в базе данных
    query = "INSERT INTO users (username, phone, password) VALUES (%s, %s, %s)"
    values = (username, phone, password_hash)

    cursor.execute(query,values)
    connection.commit()

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

def isValidExt (ALLOWED_EXTENSIONS,file_name):
    file_ext = os.path.splitext(file_name)[1]
    print(file_ext)
    if file_ext not in ALLOWED_EXTENSIONS:
        return 0
    return 1

@app.route('/processimage', methods = ['POST'])
def processimage ():
    translation = {
      "PLASTIC": "Пластик",
      "BIODEGRADABLE" : "Биоразлагаемый",
      "CARDBOARD" : "Картон",
      "CLOTH" : "Ткань",
      "GLASS" : "Стекло",
      "METAL" : "Метал",
      "PAPER" : "Бумага"
    }
    
    if 'imageFile' not in request.files:
        return json.dumps({'result': 'error: empty file input field'})  
    image = request.files.get('imageFile')
    ALLOWED_EXTENSIONS = set(['.png', '.jpg', '.jpeg', '.gif'])
    
    #and request.args.get('type') == '1'
    if image and isValidExt(ALLOWED_EXTENSIONS,image.filename):
        print('FileStorage:', image)
        print('filename:', image.filename)
        
        if image.filename == '':
            return json.dumps({'result': 'error: No selected file'}) 
        
        #if image.verify() == false:
        #   return json.dumps({'result': 'error: not an image'}) 
        try:    
            image.save("temp.png")
            prediction = model.predict("temp.png", confidence=40, overlap=30).json()
            os.remove("temp.png")
            if len(prediction['predictions']) == 0:
                return json.dumps({'result': 'В фотографии ничего не найдено'})
            print(prediction['predictions'][0]['class'])
            print(prediction)
            return json.dumps({'result': translation[prediction['predictions'][0]['class']]})
        except Exception as error:
            print(error)
            return json.dumps({'result': 'Программа вывела ошибку!'})
    else:
        return json.dumps({'result': 'Файл не является изображением'})

if __name__ == '__main__':
    app.run(debug=True, host = "0.0.0.0")
