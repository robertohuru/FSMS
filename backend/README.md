# Backend

## Getting Started
1. Open your terminal and navigate to the `backend` folder
2. Install a python virtual enviroment
#### Linux
- `sudo apt-get install python3-venv`    # If needed
- `python3 -m venv .venv`
- `source .venv/bin/activate`

#### macOS
- `python3 -m venv .venv`
- `source .venv/bin/activate`

#### Windows
- `py -3 -m venv .venv`
- `.venv/scripts/activate`
3. Upgrade PIP using `python -m pip install --upgrade pip`
4. Install packages using `python -m pip install -r requirements.txt`
5. Run migrations `python manage.py migrate`
6. Start the app using `python manage.py runserver`
