CREATE DATABASE IF NOT EXISTS eldercare;
USE eldercare;

INSERT INTO users (bio, email, full_name, location, password, phone, role)
VALUES
  ('Retired teacher living alone in Albany.',
   'alice@example.com',
   'Alice Smith',
   'Albany, NY',
   'password',
   '518-555-0001',
   'CLIENT'),

  ('Senior needing help with daily activities.',
   'bob@example.com',
   'Bob Johnson',
   'Albany, NY',
   'password',
   '518-555-0002',
   'CLIENT'),

  ('Certified caregiver with 5 years of experience.',
   'carol@example.com',
   'Carol Lee',
   'Albany, NY',
   'password',
   '518-555-1001',
   'PROVIDER'),

  ('Nursing student available on weekends.',
   'david@example.com',
   'David Brown',
   'Albany, NY',
   'password',
   '518-555-1002',
   'PROVIDER');



INSERT INTO care_posts (active, client_id, created_at, description, location, title)
VALUES
  (1, 1, NOW(),
   'Looking for someone to help with grocery shopping once a week.',
   'Albany, NY',
   'Grocery shopping assistance'),

  (1, 1, NOW(),
   'Need help with housekeeping and laundry.',
   'Albany, NY',
   'Housekeeping needed'),

  (1, 2, NOW(),
   'Seeking companion for daily walks.',
   'Albany, NY',
   'Walking companion needed'),

  (1, 2, NOW(),
   'Need help preparing meals for the week.',
   'Albany, NY',
   'Meal preparation help');

