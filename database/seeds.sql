INSERT INTO 
  user_roles (name)
VALUES 
  ('superadmin'),
  ('admin'),
  ('member'),
  ('guest');

INSERT INTO
  users (id, role_id, first_name, last_name, username, email, password, deactivated)
VALUES
  ('pacTRRHxe4ts1NAOxedtK', 1, 'John Asher', 'Manit', 'ash', 'asherjohn48@gmail.com', '$2b$10$GYXGlgtGMy1zlJalP/N76.oTuqEcyQKhs5Fk2QK1oNLUvyTs1cmr.', false);