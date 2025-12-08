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

INSERT INTO care_posts (active, client_id, created_at, description, location, title, price)
VALUES
    (1, 1, NOW(),
     'Looking for someone to help with grocery shopping once a week.',
     'Albany, NY',
     'Grocery shopping assistance',
     '$20/hr'),

    (1, 1, NOW(),
     'Need help with housekeeping and laundry.',
     'Albany, NY',
     'Housekeeping needed',
     '$25/hr'),

    (1, 2, NOW(),
     'Seeking companion for daily walks.',
     'Albany, NY',
     'Walking companion needed',
     '$18/hr'),

    (1, 2, NOW(),
     'Need help preparing meals for the week.',
     'Albany, NY',
     'Meal preparation help',
     '$30/hr');

CREATE TABLE post_history (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              user_id BIGINT NOT NULL,
                              care_post_id BIGINT NOT NULL,
                              viewed_at TIMESTAMP NOT NULL,
                              CONSTRAINT fk_post_history_user
                                  FOREIGN KEY (user_id) REFERENCES users(id),
                              CONSTRAINT fk_post_history_care_post
                                  FOREIGN KEY (care_post_id) REFERENCES care_post(id)
);
