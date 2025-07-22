from __init__ import create_api
from flask_cors import CORS
    
app = create_api()

CORS(app, origins=["http://localhost:3000", "https://farmazul.vercel.app/"], supports_credentials=True)

if __name__ == "__main__":
    app.run(debug=True)
