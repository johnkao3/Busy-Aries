CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  username text NOT NULL,
  legal_name text NOT NULL,
  nick_name text,
  password text,
  is_active boolean NOT NULL DEFAULT true,
  role text DEFAULT 'EMPLOYEE',
  created_at timestamptz NOT NULL DEFAULT now()
);