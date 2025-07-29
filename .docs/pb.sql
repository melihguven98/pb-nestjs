-- Users tablosu için veri ekleme (3 kullanıcı)
  INSERT INTO users (email, password, first_name, last_name, role, is_active, created_at, updated_at) VALUES
  ('admin@example.com', '$2b$10$hash', 'John', 'Admin', 'admin', true, NOW(), NOW()),
  ('recruiter@example.com', '$2b$10$hash', 'Jane', 'Smith', 'recruiter', true, NOW(), NOW()),
  ('interviewer@example.com', '$2b$10$hash', 'Mike', 'Johnson', 'interviewer', true, NOW(), NOW());

  -- Projects tablosu için veri ekleme (2 proje)
  INSERT INTO projects (title, description, status, position, requirements, deadline, owner_id, created_at, updated_at)
  VALUES
  ('Frontend Developer Position', 'We are looking for an experienced React developer to join our team.', 'active', 'Senior 
  Frontend Developer', 'React, TypeScript, Redux experience required', '2024-12-31', 2, NOW(), NOW()),
  ('Backend Developer Position', 'Seeking a skilled Node.js developer for our backend team.', 'active', 'Senior Backend 
  Developer', 'Node.js, PostgreSQL, REST API experience', '2024-11-30', 2, NOW(), NOW());

  -- Candidates tablosu için veri ekleme (4 aday)
  INSERT INTO candidates (first_name, last_name, email, phone, resume_url, status, notes, score, project_id, created_at,
  updated_at) VALUES
  ('Alice', 'Brown', 'alice.brown@email.com', '+1234567890', 'https://example.com/resume1.pdf', 'applied', 'Strong React 
  background', 85, 1, NOW(), NOW()),
  ('Bob', 'Davis', 'bob.davis@email.com', '+1234567891', 'https://example.com/resume2.pdf', 'screening', 'Good communication 
  skills', 75, 1, NOW(), NOW()),
  ('Carol', 'Wilson', 'carol.wilson@email.com', '+1234567892', 'https://example.com/resume3.pdf', 'interview', 'Excellent 
  Node.js knowledge', 90, 2, NOW(), NOW()),
  ('David', 'Miller', 'david.miller@email.com', '+1234567893', 'https://example.com/resume4.pdf', 'applied', 'Junior level 
  candidate', 60, 2, NOW(), NOW());