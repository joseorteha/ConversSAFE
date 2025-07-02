INSERT INTO credentials(username, email, password, salt)
SELECT ${username}, ${email}, ${password}, ${salt}
WHERE NOT EXISTS (
  SELECT 1 FROM credentials WHERE email = ${email} or username = ${username}
);

