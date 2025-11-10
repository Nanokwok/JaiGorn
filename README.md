# Jaigorn
> **BNPL for the Offline Micro-Economy**
<img width="1920" height="1080" alt="mockup" src="https://github.com/user-attachments/assets/47586d2d-0c88-437d-be50-954498982192" />

Jaigorn (Thai for "Pay First") is a mobile-first "Buy Now, Pay Later" (BNPL) solution designed specifically to bridge the credit gap in the offline world. We provide instant point-of-sale financing for underbanked consumers and micro-SMEs, enabling transactions that would otherwise be lost.

## Core Features
* **Instant Point-of-Sale Financing:** On-the-spot loan approval in seconds.
* **Reverse QR Flow:** An intuitive, merchant-led process that fits a face-to-face environment.
* **Accessible to All:** Designed for users without formal credit histories or paystubs.
* **No Hardware Required:** Works on any smartphone, eliminating the need for expensive card terminals.
* **Drive Sales for Micro-SMEs:** Helps small businesses capture lost revenue and build customer loyalty.

## Tech Stack
- Frontend: React Native
- Backend: Django REST Framework
- Database: PostgreSQL on Huawei Cloud 

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL
- React Native environment

### Installation

Clone repository:
```bash
git clone https://github.com/nanokwok/JaiGorn.git
```

Navigate to project folder:
```bash
cd JaiGorn
```

### Backend Setup

Create virtual environment:
```bash
python -m venv venv
```

Activate virtual environment:
```bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Configure environment:
```bash
cp .env.sample .env
# Edit .env with your configuration
```

Start backend server:
```bash
python manage.py runserver
```

For phone simulation:
```bash
python manage.py runserver 0.0.0.0:8000
```

Create an admin user (optional):
```bash
python manage.py createsuperuser
```

### Frontend Setup

Navigate to frontend directory:
```bash
cd ../frontend
```

Install frontend dependencies:
```bash
npm install
```

Configure environment:
```bash
cp .env.sample .env
# Edit .env with your wifi IP Address eg. https://192.123.21:8000/api
```

Start the application:
```bash
npx expo start
```
