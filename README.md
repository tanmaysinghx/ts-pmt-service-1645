# ts-pmt-service-1645

## Overview

This project is an authentication service built using Node.js, Express, Typescript and Prisma. It handles user registration, login, change-password, token management, OTP verification and more.

## Prerequisites

- Node.js (v18.x or later)
- MySQL (or another supported SQL database)
- Prisma CLI
- Typescript

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tanmaysinghx/ts-pmt-service-1645.git
cd ts-pmt-service-1645

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

- Rename ".env.example" to ".env"
- Create a DB cluster in SQL DB or your preferred DB

```bash
DATABASE_URL="mysql://root:root@localhost:3306/testdb2"

```

### 4. Run Database Migrations

```bash
npx prisma migrate deploy

```

### 5. Run scripts for roles

```bash
npm run seed

```

### 6. Start the Application

```bash
npm run dev

```

### 7. Redeploy DB changes

```bash
npx prisma migrate dev --name add_otp_table

```