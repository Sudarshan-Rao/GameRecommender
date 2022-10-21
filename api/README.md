# Setup

We are using pipenv to manage python virtual environment.

First, run:

	pipx install pipenv

Note: If pipx is not installed use your system's package manager to install it.
	Ex: `apt` for ubuntu

Then run:
	
	pipenv shell

You are good to go!

# FastAPI

Use the requirements.txt file to get the dependencies.

Then run `uvicorn main:app --reload`, for the dev server.
