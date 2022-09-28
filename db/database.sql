CREATE DATABASE cryroom;

CREATE TABLE "message" (
  id SERIAL PRIMARY KEY,
  msg TEXT,
  sign CHAR(255),
  "date" TIMESTAMPTZ NULL DEFAULT clock_timestamp()
);
