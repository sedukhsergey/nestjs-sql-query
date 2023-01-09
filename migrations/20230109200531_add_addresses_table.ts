import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE addresses (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      street text,
      city text,
      country text
    );
    ALTER TABLE users
        ADD COLUMN address_id int UNIQUE REFERENCES addresses(id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE addresses;
    ALTER TABLE users
        DROP COLUMN address_id;
  `);
}
