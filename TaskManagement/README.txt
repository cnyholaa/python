Task Management API
AN API platform built with FastAPI for operational task management and user-based workflow tracking.
This project was developed to strengthen backend engineering, API design, authentication, and operational automation skills using Python.

・Features
RESTful API development with FastAPI
JWT authentication and authorization
Role-based access control (RBAC)
User-based task isolation
CRUD operations for task management
SQLAlchemy ORM integration
SQLite database support
Backend validation and exception handling

・Project Structure
TaskManagement/
├── routers/
│   ├── auth.py
│   ├── tasks.py
│   └── admin.py
├── database.py
├── models.py
├── main.py
└── README.md

・Authentication Flow
1.User registration
2.Password hashing with bcrypt
3.User login
4.JWT token generation
5.Protected API access using Bearer token
6.Role-based authorization for admin endpoints

・API Endpoints
1.Authentication
Method(Endpoint):
POST(/auth/): Create user
POST(/auth/token): Login and generate JWT token

2.Tasks:
GET(/Get): all user tasks
GET(/read_tasks/{task_id}):	Get single task
POST(/create_task):	Create task
PUT(/update_task/{task_id}):	Update task
DELETE(/delete_task/{task_id}):	Delete task

・Admin:
GET(/admin/):	Admin-only task access

・How to Run
1. Clone Repository
  git clone https://github.com/cnyholaa/backend-task-api.git
  cd backend-task-api
2. Create Virtual Environment
  python -m venv venv
3. Activate Virtual Environment
  (1) Windows
    venv\Scripts\activate
  (2) macOS/Linux
    source venv/bin/activate
4. Install Dependencies
  pip install -r requirements.txt
5. Run Server
  uvicorn main:app --reload

・Future Improvements
PostgreSQL integration
Docker containerization
AWS deployment
CI/CD pipeline
Automated testing with pytest


