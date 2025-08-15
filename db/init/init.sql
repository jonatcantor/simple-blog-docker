CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO posts (title, content) VALUES
('Prueba 1', 'Esto es una entrada de prueba. Contenido del post de Prueba 1.'),
('Prueba 2', 'Esto es una entrada de prueba. Contenido del post de Prueba 2.'),
('Prueba 3', 'Esto es una entrada de prueba. Contenido del post de Prueba 3.');
