CREATE TABLE attendances (
  id serial NOT NULL PRIMARY KEY,
  mode VARCHAR(2) NOT NULL DEFAULT '',
  users_id TEXT,
  name TEXT DEFAULT '',
  user_id TEXT DEFAULT '',
  card_id TEXT DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);