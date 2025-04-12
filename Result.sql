CREATE TABLE results (
  name VARCHAR(100),
  roll_number VARCHAR(10),
  roll_code VARCHAR(10),
  total_marks INT,
  result_status VARCHAR(10)
);

INSERT INTO results (name, roll_number, roll_code, total_marks, result_status) VALUES
('Janvi', '138707', '1023', 432, 'Pass'),
('KnarliX', '138708', '1023', 299, 'Fail');
